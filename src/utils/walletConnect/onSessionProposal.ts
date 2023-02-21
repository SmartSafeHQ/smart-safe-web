import { SignClient } from '@walletconnect/sign-client/dist/types/client'
import { SessionTypes, SignClientTypes } from '@walletconnect/types'

import { EIP155_SIGNING_METHODS } from '@utils/walletConnect'
import { approveEIP155Request } from '@utils/walletConnect/EIP155RequestHandlerUtil'

interface OnSessionProposalProps {
  signClient: SignClient
  wallet?: {
    address: string
    privateKey: string
  }
}

export async function onSessionProposal({
  signClient,
  wallet
}: OnSessionProposalProps) {
  if (!wallet) return

  signClient.on(
    'session_proposal',
    async (event: SignClientTypes.EventArguments['session_proposal']) => {
      // up modal proposal

      // event = {
      //   id: 1676994111617549,
      //   params: {
      //     expiry: 1676994417,
      //     id: 1676994111617549,
      //     optionalNamespaces: {},
      //     pairingTopic:
      //       '90504d3a183da71be8b144083c8521456d56e74327be4eab065a483fe0310197',
      //     proposer: {
      //       metadata: {
      //         description: 'React App for WalletConnect',
      //         icons: ['https://avatars.githubusercontent.com/u/37784886'],
      //         name: 'React App',
      //         url: 'https://react-app.walletconnect.com'
      //       },
      //       publicKey:
      //         'fd3715cfb93219b91e349910dd0ee7a41a316a993b1bc343164c0e73d5e53a73'
      //     },
      //     relays: [{ protocol: 'irn' }],
      //     requiredNamespaces: { eip155: '{…}' }
      //   }
      // }

      // Show session proposal data to the user i.e. in a modal with options to approve / reject it
      // Get required proposal data
      const {
        id,
        params: { requiredNamespaces, relays }
      } = event

      console.log('approve event =>', event)

      // Approve session proposal, use id from session proposal event and respond with namespace(s) that satisfy dapps request and contain approved accounts
      const namespaces: SessionTypes.Namespaces = {}

      Object.keys(requiredNamespaces).forEach(key => {
        const accounts: string[] = []

        requiredNamespaces[key]?.chains?.forEach(chain => {
          accounts.push(`${chain}:${wallet.address}`)
        })

        namespaces[key] = {
          accounts,
          methods: requiredNamespaces[key].methods,
          events: requiredNamespaces[key].events
        }
      })

      const { acknowledged } = await signClient.approve({
        id,
        relayProtocol: relays[0].protocol,
        namespaces
      })

      await acknowledged()
    }
  )

  signClient.on(
    'session_request',
    async (requestEvent: SignClientTypes.EventArguments['session_request']) => {
      console.log('session request event =>', requestEvent)

      const { topic, params } = requestEvent
      const { request } = params

      switch (request.method) {
        case EIP155_SIGNING_METHODS.ETH_SIGN:
        case EIP155_SIGNING_METHODS.PERSONAL_SIGN: {
          // up sign request modal

          const response = await approveEIP155Request(
            wallet.privateKey,
            requestEvent
          )

          await signClient.respond({
            topic,
            response
          })
          break
        }
        case EIP155_SIGNING_METHODS.ETH_SIGN_TYPED_DATA:
        case EIP155_SIGNING_METHODS.ETH_SIGN_TYPED_DATA_V3:
        case EIP155_SIGNING_METHODS.ETH_SIGN_TYPED_DATA_V4: {
          return console.log('SIGN_TYPED_DATA', requestEvent)
        }

        case EIP155_SIGNING_METHODS.ETH_SEND_TRANSACTION:
        case EIP155_SIGNING_METHODS.ETH_SIGN_TRANSACTION:
          return console.log('SEND/SIGN_TRANSACTION', requestEvent)

        default:
          return console.log('UNSUPORTED', requestEvent)
      }
    }
  )
}
