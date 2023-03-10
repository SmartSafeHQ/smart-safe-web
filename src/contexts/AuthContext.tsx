import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState
} from 'react'
import { Auth } from 'aws-amplify'
import { useRouter } from 'next/router'

import { MobileBridgeCommunication } from '@decorators/MobileBridgeCommunication'

import { tokenverseApi } from '@lib/axios'
import { queryClient } from '@lib/reactQuery'
import {
  fetchAccountWallets,
  FetchAccountWalletsResponse
} from '@hooks/accounts/queries/useAccountWallets'

type Customer = {
  cognitoId: string
  wallets: {
    evm: {
      address: string
      privateKey: string
    }
    solana: {
      address: string
      privateKey: string
    }
  }
  name: string
  email: string
}

type AuthProviderProps = PropsWithChildren<Record<string, unknown>>

type AuthContextData = {
  customer: Customer | null
  widgetProvider: any | null
  setWidgetProvider: (_widgetProvider: any) => void
  setCustomer: (_customer: Customer) => void
  signOut: () => void
}

const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const { push, asPath } = useRouter()
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [widgetProvider, setWidgetProvider] = useState(null)

  async function signOut() {
    try {
      MobileBridgeCommunication.initialize().logout()

      await Auth.signOut({ global: true })
    } catch (error) {
      console.error(error)

      const authCookies = document.cookie
        .split(';')
        .filter(cookie =>
          cookie.trim().startsWith('CognitoIdentityServiceProvider')
        )

      authCookies.forEach(cookie => {
        document.cookie = cookie
          .replace(/^ +/, '')
          .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/')
      })
    } finally {
      push('/')
    }
  }

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(async response => {
        const sessionData = response.attributes

        const accessToken = response.signInUserSession.idToken.jwtToken

        tokenverseApi.defaults.headers.common.Authorization = `Bearer ${accessToken}`

        const accountWallets =
          await queryClient.ensureQueryData<FetchAccountWalletsResponse>({
            queryKey: ['accountWallets', accessToken],
            queryFn: () => fetchAccountWallets(accessToken)
          })

        MobileBridgeCommunication.initialize().saveBiometric()

        setCustomer({
          cognitoId: sessionData.sub,
          name: sessionData.name,
          wallets: accountWallets,
          email: sessionData.email
        })
      })
      .catch(_ => {
        setCustomer(null)

        const isAuthCheckCase = ['/dashboard'].some(path =>
          asPath.startsWith(path)
        )

        if (isAuthCheckCase) {
          signOut()
        }
      })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        customer,
        widgetProvider,
        setWidgetProvider,
        setCustomer,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
