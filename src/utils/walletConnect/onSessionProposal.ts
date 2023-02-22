import { utils } from 'ethers'
import { SignClient } from '@walletconnect/sign-client/dist/types/client'
import { SignClientTypes } from '@walletconnect/types'

import { EIP155_SIGNING_METHODS } from '@utils/walletConnect'
import { approveEIP155Request } from '@utils/walletConnect/EIP155RequestHandlerUtil'
import {
  ApproveSessionDataProps,
  SessionDataProps
} from '@hooks/accounts/useWcLogin'

interface OnSessionProposalProps {
  signClient: SignClient
  setSessionData: (_data: ApproveSessionDataProps) => void
  setSessionSignData: (_data: SessionDataProps) => void
  wallet?: {
    address: string
    privateKey: string
  }
}

export async function onSessionProposal({
  signClient,
  setSessionData,
  setSessionSignData,
  wallet
}: OnSessionProposalProps) {
  if (!wallet) return

  signClient.on(
    'session_proposal',
    async (event: SignClientTypes.EventArguments['session_proposal']) => {
      setSessionData({
        id: event.id,
        isModalOpen: true,
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
      const { id, topic, params } = requestEvent

      switch (params.request.method) {
        case EIP155_SIGNING_METHODS.ETH_SIGN:
        case EIP155_SIGNING_METHODS.PERSONAL_SIGN: {
          let message = params.request.params.filter(
            (p: string) => !utils.isAddress(p)
          )[0]

          if (utils.isHexString(message)) {
            message = utils.toUtf8String(message)
          }

          const response = await approveEIP155Request(
            wallet.privateKey,
            requestEvent
          )

          setSessionSignData({
            id,
            topic,
            blockchains: 'ethereum',
            isModalOpen: true,
            message,
            signResponse: response
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
