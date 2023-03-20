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
import dayjs from 'dayjs'

import { MobileBridgeCommunication } from '@decorators/MobileBridgeCommunication'

import { tokenverseApi } from '@lib/axios'
import { queryClient } from '@lib/reactQuery'
import {
  fetchAccountWallets,
  FetchAccountWalletsResponse
} from '@hooks/accounts/queries/useAccountWallets'
import { CustomerProps } from '@utils/global/types'

export type Customer2FAProps = {
  signInEnabled: boolean
  send2faEnabled: boolean
  exportKeys2faEnabled: boolean
  lastVerifyAt: number
}

type AuthProviderProps = PropsWithChildren<Record<string, unknown>>

type AuthContextData = {
  customer: CustomerProps | null
  cognitoUser: any | null
  customer2FA: Customer2FAProps | null
  widgetProvider: any | null
  is2FAVerifyOpen: boolean
  setCustomer: Dispatch<SetStateAction<CustomerProps | null>>
  setCustomer2FA: Dispatch<SetStateAction<Customer2FAProps | null>>
  setIs2FAVerifyOpen: Dispatch<SetStateAction<boolean>>
  setWidgetProvider: (_widgetProvider: any) => void
  setCognitoUser: (_cognitoUser: any) => void
  verify2FA: () => void
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

  function verify2FA() {
    if (!customer2FA) {
      setIs2FAVerifyOpen(true)
      setCustomer2FA({
        signInEnabled: true,
        send2faEnabled: false,
        exportKeys2faEnabled: false,
        lastVerifyAt: Date.now()
      })
      return
    }

    const lastVerifyAt = dayjs(customer2FA.lastVerifyAt)
    const secondsSinceLast2FAVerify = dayjs().diff(lastVerifyAt, 'seconds')

    if (secondsSinceLast2FAVerify < 30) return

    setIs2FAVerifyOpen(true)
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
          send2faEnabled: false,
          exportKeys2faEnabled: false,
          lastVerifyAt: Date.now()
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
        verify2FA,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
