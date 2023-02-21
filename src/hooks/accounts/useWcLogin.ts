import { useEffect, useState } from 'react'
import { ISignClient } from '@walletconnect/types'
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

type QrCodeScannerState = 'open' | 'closed' | 'loading'

const validationSchema = z.object({
  uri: z.string().min(1, { message: 'uri required' })
})

type WcLoginFieldValues = z.infer<typeof validationSchema>

export const useWcLogin = () => {
  const [signClient, setSignClient] = useState<ISignClient>()
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false)
  const [isQrScanOpen, setIsQrScanOpen] = useState<QrCodeScannerState>('closed')

  const { register, handleSubmit, formState } = useForm<WcLoginFieldValues>({
    resolver: zodResolver(validationSchema)
  })

  const { customer } = useAuth()
  const { t } = useI18n()

  async function createClient() {
    try {
      const client = await SignClient.init({
        logger: 'debug',
        projectId: '3340800244ece4bb36144fd392bbad42',
        // // optional parameters
        // relayUrl: "<YOUR RELAY URL>",
        metadata: {
          name: 'Tokenverse',
          description: 'A wallet Tokenverse',
          url: 'localhost:3001', // 'window.location.host',
          icons: ['https://my-auth-wallet.com/icons/logo.png']
        }
      })

      setSignClient(client)

      return client
    } catch (e) {
      console.log(e)
    }
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
      createClient().then(createdSignClient => {
        if (!createdSignClient) return

        onSessionProposal({
          wallet: customer.wallet,
          signClient: createdSignClient
        })
      })
    }
  }, [signClient, customer])

  const onSubmit: SubmitHandler<WcLoginFieldValues> = async ({ uri }) => {
    try {
      const { version } = parseUri(uri)

      // Verify URI is v1 SignClient if URI version indicates it, else use v2.
      if (version === 1) {
        createLegacySignClient({ uri, wallet: customer?.wallet })
      } else {
        await signClient?.core.pairing.pair({ uri })
      }
    } catch (error) {
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
    customer,
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
