import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
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

export type Customer2FAProps = {
  signInEnabled: boolean
  sendEnabled: boolean
  exportKeysEnabled: boolean
}

export type CustomerProps = {
  id: number
  cognitoId: string
  name: string
  email: string
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
}

type AuthProviderProps = PropsWithChildren<Record<string, unknown>>

type AuthContextData = {
  customer: CustomerProps | null
  cognitoUser: any | null
  customer2FA: Customer2FAProps | null
  widgetProvider: any | null
  is2FAVerifyOpen: boolean
  setWidgetProvider: (_widgetProvider: any) => void
  setCustomer: Dispatch<SetStateAction<CustomerProps | null>>
  setCognitoUser: (_cognitoUser: any) => void
  setCustomer2FA: Dispatch<SetStateAction<Customer2FAProps | null>>
  setIs2FAVerifyOpen: Dispatch<SetStateAction<boolean>>
  signOut: () => void
}

const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const { push, asPath } = useRouter()
  const [cognitoUser, setCognitoUser] = useState<any | null>(null)
  const [customer, setCustomer] = useState<CustomerProps | null>(null)
  const [customer2FA, setCustomer2FA] = useState<Customer2FAProps | null>(null)
  const [is2FAVerifyOpen, setIs2FAVerifyOpen] = useState(false)
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
        setCognitoUser(response)

        const sessionData = response.attributes

        const accessToken = response.signInUserSession.idToken.jwtToken

        tokenverseApi.defaults.headers.common.Authorization = `Bearer ${accessToken}`

        const accountWallets =
          await queryClient.ensureQueryData<FetchAccountWalletsResponse>({
            queryKey: ['accountWallets', accessToken],
            queryFn: () => fetchAccountWallets(accessToken)
          })

        MobileBridgeCommunication.initialize().saveBiometric()

        setCustomer2FA({
          signInEnabled: response.preferredMFA !== 'NOMFA',
          sendEnabled: false,
          exportKeysEnabled: false
        })

        setCustomer({
          id: accountWallets.id,
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
        cognitoUser,
        customer2FA,
        widgetProvider,
        is2FAVerifyOpen,
        setWidgetProvider,
        setCustomer,
        setCognitoUser,
        setCustomer2FA,
        setIs2FAVerifyOpen,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
