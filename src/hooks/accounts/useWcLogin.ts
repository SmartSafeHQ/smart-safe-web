import { useEffect, useState } from 'react'
import { ISignClient, SessionTypes } from '@walletconnect/types'
import { SignClient } from '@walletconnect/sign-client'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { parseUri } from '@walletconnect/utils'

import { createLegacySignClient } from '@utils/walletConnect/LegacyWalletConnectUtil'
import { useAuth } from '@contexts/AuthContext'

const validationSchema = z.object({
  uri: z.string().min(1, { message: 'uri required' })
})

type WcLoginFieldValues = z.infer<typeof validationSchema>

export const useWcLogin = () => {
  const [signClient, setSignClient] = useState<ISignClient>()
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false)

  const { register, handleSubmit, formState } = useForm<WcLoginFieldValues>({
    resolver: zodResolver(validationSchema)
  })

  const { customer } = useAuth()

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
          url: window.location.host,
          icons: ['https://my-auth-wallet.com/icons/logo.png']
        }
      })

      setSignClient(client)

      client.on('session_proposal', async event => {
        // Show session proposal data to the user i.e. in a modal with options to approve / reject it
        // Get required proposal data
        const { id, params } = event
        const { requiredNamespaces, relays } = params

        // Approve session proposal, use id from session proposal event and respond with namespace(s) that satisfy dapps request and contain approved accounts

        const namespaces: SessionTypes.Namespaces = {}
        Object.keys(requiredNamespaces).forEach(key => {
          const accounts: string[] = []
          requiredNamespaces[key]?.chains?.forEach(chain => {
            accounts.push(`${chain}:0x574E1D58B0208f7EbB12851FDab54ab06bb5cd45`)
          })

          namespaces[key] = {
            accounts,
            methods: requiredNamespaces[key].methods,
            events: requiredNamespaces[key].events
          }
        })

        console.log('approve =>', {
          id,
          relayProtocol: relays[0].protocol,
          namespaces
        })

        const { acknowledged, topic } = await client.approve({
          id,
          relayProtocol: relays[0].protocol,
          namespaces
        })
        await acknowledged()

        console.log({ topic })
      })
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (!customer) {
      setIsSignInModalOpen(true)
      return
    }

    if (!signClient) {
      createClient()
    }
  }, [signClient, customer])

  const onSubmit: SubmitHandler<WcLoginFieldValues> = async ({ uri }) => {
    try {
      const { version } = parseUri(uri)

      // Verify URI is v1 SignClient if URI version indicates it, else use v2.
      if (version === 1) {
        createLegacySignClient({ uri })
      } else {
        await signClient?.core.pairing.pair({ uri })
      }
    } catch (error) {
      toast.error(`Error. ${(error as Error).message}`)
    }
  }

  return {
    isSignInModalOpen,
    register,
    handleSubmit,
    formState,
    onSubmit
  }
}
