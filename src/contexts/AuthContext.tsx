import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState
} from 'react'
import { Auth } from 'aws-amplify'
import { useRouter } from 'next/router'

import { FetchEndUserWalletsResponse } from '@/hooks/accounts/mutations/useLoginMutation'
import { tokenverseApi } from '@lib/axios'

type Customer = {
  cognitoId: string
  wallet: {
    address: string
    privateKey: string
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
      push('/accounts/login')
    }
  }

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(async response => {
        const sessionData = response.attributes

        const accessToken = response.signInUserSession.idToken.jwtToken

        tokenverseApi.defaults.headers.common.Authorization = `Bearer ${accessToken}`

        const apiResponse =
          await tokenverseApi.get<FetchEndUserWalletsResponse>(
            '/widget/wallets'
          )

        setCustomer({
          cognitoId: sessionData.sub,
          name: sessionData?.name // TEMP WHILE WIDGET DOESNT SAVE THE NAME TOO
            ? sessionData.name
            : sessionData?.email?.substring(0, 8),
          wallet: {
            address: apiResponse.data.wallets[0].address,
            privateKey: apiResponse.data.wallets[0].private_key
          },
          email: sessionData.email
        })
      })
      .catch(_ => {
        setCustomer(null)

        const isAuthRequired = asPath !== '/'

        if (isAuthRequired) {
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
