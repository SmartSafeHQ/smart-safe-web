import { SignClient } from '@walletconnect/sign-client/dist/types/client'
import { SignClientTypes } from '@walletconnect/types'

import { EIP155_SIGNING_METHODS } from '@utils/walletConnect'
import { approveEIP155Request } from '@utils/walletConnect/EIP155RequestHandlerUtil'
import { ApproveSessionDataProps } from '@hooks/accounts/useWcLogin'

interface OnSessionProposalProps {
  signClient: SignClient
  setSessionData: (_data: ApproveSessionDataProps) => void
  wallet?: {
    address: string
    privateKey: string
  }
}

export async function onSessionProposal({
  signClient,
  setSessionData,
  wallet
}: OnSessionProposalProps) {
  if (!wallet) return

  signClient.on(
    'session_proposal',
    async (event: SignClientTypes.EventArguments['session_proposal']) => {
      setSessionData({
        id: event.id,
        isModalOpen: true,
        apiVersion: 2,
        chainId: 1,
        description: event.params.proposer.metadata.description,
        avatarUrl: event.params.proposer.metadata.icons[0],
        name: event.params.proposer.metadata.name,
        url: event.params.proposer.metadata.url,
        v2Params: event.params
      })
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
