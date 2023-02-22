import { useEffect, useState } from 'react'
import { ISignClient, SignClientTypes } from '@walletconnect/types'
import { JsonRpcResult } from '@walletconnect/jsonrpc-types'
import LegacySignClient from '@walletconnect/client'
import { SignClient } from '@walletconnect/sign-client'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { parseUri } from '@walletconnect/utils'
import { Result } from 'react-zxing'

import { createLegacySignClient } from '@utils/walletConnect/LegacyWalletConnectUtil'
import { onSessionProposal } from '@utils/walletConnect/onSessionProposal'
import { useAuth } from '@contexts/AuthContext'
import { useI18n } from '@hooks/useI18n'
import { signClientOptions } from '@utils/walletConnect'

type QrCodeScannerState = 'open' | 'closed' | 'loading'

export interface ApproveSessionDataProps {
  id: number
  isModalOpen: boolean
  chainId?: number
  description?: string
  avatarUrl?: string
  name?: string
  url?: string
  v2Params?: SignClientTypes.EventArguments['session_proposal']['params']
}

export interface SessionDataProps {
  id: number
  isModalOpen: boolean
  message: string
  topic: string
  blockchains: string
  signResponse: JsonRpcResult<string>
}

const validationSchema = z.object({
  uri: z.string().min(1, { message: 'uri required' })
})

type WcLoginFieldValues = z.infer<typeof validationSchema>

export const useWcLogin = () => {
  const [signClient, setSignClient] = useState<ISignClient | LegacySignClient>()
  const [sessionData, setSessionData] =
    useState<ApproveSessionDataProps | null>(null)
  const [sessionSignData, setSessionSignData] =
    useState<SessionDataProps | null>(null)
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false)
  const [isQrScanOpen, setIsQrScanOpen] = useState<QrCodeScannerState>('closed')

  const { register, handleSubmit, formState } = useForm<WcLoginFieldValues>({
    resolver: zodResolver(validationSchema)
  })

  const { customer } = useAuth()
  const { t } = useI18n()

  async function createClient() {
    const signClient = await SignClient.init(signClientOptions)

    setSignClient(signClient)

    return signClient
  }

  useEffect(() => {
    const authCookies = document.cookie
      .split(';')
      .filter(cookie =>
        cookie.trim().startsWith('CognitoIdentityServiceProvider')
      )

    if (authCookies.length === 0) {
      setIsSignInModalOpen(true)
      return
    }

    if (!signClient && customer) {
      createClient()
        .then(createdSignClient => {
          if (!createdSignClient) return

          onSessionProposal({
            wallet: customer.wallet,
            signClient: createdSignClient,
            setSessionSignData,
            setSessionData
          })
        })
        .catch(error => {
          console.log(error)

          toast.error(`Error. ${(error as Error).message}`)
        })
    }
  }, [signClient, customer])

  const onSubmit: SubmitHandler<WcLoginFieldValues> = async ({ uri }) => {
    try {
      const { version } = parseUri(uri)

      // Verify URI version is v1 or v2 to SignClient
      if (version === 1) {
        createLegacySignClient({
          uri,
          wallet: customer?.wallet,
          setSignClient,
          setSessionSignData,
          setSessionData
        })
      }

      if (version === 2 && signClient instanceof ISignClient) {
        await signClient.core.pairing.pair({ uri })
      }
    } catch (error) {
      console.log(error)

      toast.error(`Error. ${(error as Error).message}`)
    }
  }

  const handleScan = (result: Result) => {
    if (!result) {
      return
    }

    onSubmit({ uri: result.getText() })

    setIsQrScanOpen('closed')
  }

  return {
    t,
    signClient,
    customer,
    sessionSignData,
    setSessionSignData,
    sessionData,
    setSessionData,
    setIsSignInModalOpen,
    isQrScanOpen,
    setIsQrScanOpen,
    isSignInModalOpen,
    register,
    handleSubmit,
    formState,
    handleScan,
    onSubmit
  }
}
