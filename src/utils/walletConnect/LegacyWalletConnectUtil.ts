import {
  IWalletConnectSession,
  ISessionParams
} from '@walletconnect/legacy-types'
import { toast } from 'react-toastify'
import LegacySignClient from '@walletconnect/client'
import { utils } from 'ethers'

import { EIP155_SIGNING_METHODS, signClientOptions } from '@utils/walletConnect'
import { approveEIP155Request } from '@utils/walletConnect/EIP155RequestHandlerUtil'
import {
  ApproveSessionDataProps,
  SessionDataProps
} from '@hooks/accounts/useWcLogin'

interface CreateLegacySignClientProps {
  uri?: string
  setSessionData: (_data: ApproveSessionDataProps) => void
  setSessionSignData: (_data: SessionDataProps) => void
  setSignClient: (_client: LegacySignClient) => void
  wallet?: {
    address: string
    privateKey: string
  }
}

interface OnCallRequestProps {
  id: number
  method: string
  params: any[]
  walletPrivateKey: string
  legacySignClient: LegacySignClient
  setSessionSignData: (_data: SessionDataProps) => void
}

export function createLegacySignClient({
  uri,
  setSessionData,
  setSignClient,
  setSessionSignData,
  wallet
}: CreateLegacySignClientProps) {
  if (!wallet) return

  let legacySignClient: LegacySignClient | null = null

  if (uri) {
    deleteCachedLegacySession()

    legacySignClient = new LegacySignClient({
      uri,
      clientMeta: signClientOptions.metadata
    })
  } else if (!legacySignClient && getCachedLegacySession()) {
    const session = getCachedLegacySession()

    legacySignClient = new LegacySignClient({
      session,
      clientMeta: signClientOptions.metadata
    })
  } else {
    return
  }

  setSignClient(legacySignClient)

  legacySignClient.on(
    'session_request',
    (error, payload: { id: number; params: ISessionParams[] }) => {
      if (error) {
        toast.error(`Error. ${(error as Error).message}`)

        console.log(`legacySignClient > session_request failed: ${error}`)
        return
      }

      setSessionData({
        id: payload.id,
        isModalOpen: true,
        chainId: payload.params[0].chainId ?? undefined,
        description: payload.params[0].peerMeta?.description,
        avatarUrl: payload.params[0].peerMeta?.icons[0],
        name: payload.params[0].peerMeta?.name,
        url: payload.params[0].peerMeta?.url
      })
    }
  )

  legacySignClient.on('error', error => {
    toast.error(`Error. ${(error as Error).message}`)

    console.log(`legacySignClient > on error: ${error}`)
  })

  legacySignClient.on('call_request', (error, payload) => {
    if (error) {
      toast.error(`Error. ${(error as Error).message}`)

      console.log(`legacySignClient > call_request failed: ${error}`)
      return
    }

    onCallRequest({
      ...payload,
      legacySignClient,
      setSessionSignData,
      walletPrivateKey: wallet.privateKey
    })
  })

  legacySignClient.on('disconnect', async () => {
    deleteCachedLegacySession()
  })
}

const onCallRequest = async ({
  id,
  legacySignClient,
  setSessionSignData,
  method,
  params,
  walletPrivateKey
}: OnCallRequestProps) => {
  switch (method) {
    case EIP155_SIGNING_METHODS.ETH_SIGN:
    case EIP155_SIGNING_METHODS.PERSONAL_SIGN: {
      const requestEvent = {
        id,
        topic: '',
        params: {
          request: { method, params },
          chainId: '1'
        }
      }

      let message = params.filter(p => !utils.isAddress(p))[0]

      if (utils.isHexString(message)) {
        message = utils.toUtf8String(message)
      }

      const response = await approveEIP155Request(
        walletPrivateKey,
        requestEvent
      )

      setSessionSignData({
        id,
        topic: requestEvent.topic,
        blockchains: 'ethereum',
        isModalOpen: true,
        message,
        signResponse: response
      })

      return
    }

    case EIP155_SIGNING_METHODS.ETH_SIGN_TYPED_DATA:
    case EIP155_SIGNING_METHODS.ETH_SIGN_TYPED_DATA_V3:
    case EIP155_SIGNING_METHODS.ETH_SIGN_TYPED_DATA_V4: {
      return console.log('LegacySessionSignTypedDataModal', {
        legacyCallRequestEvent: { id, method, params },
        legacyRequestSession: legacySignClient.session
      })
    }

    case EIP155_SIGNING_METHODS.ETH_SEND_TRANSACTION:
    case EIP155_SIGNING_METHODS.ETH_SIGN_TRANSACTION: {
      return console.log('LegacySessionSendTransactionModal', {
        legacyCallRequestEvent: { id, method, params },
        legacyRequestSession: legacySignClient.session
      })
    }

    default: {
      toast.error(`${method} is not supported for WalletConnect v1`)
    }
  }
}

function getCachedLegacySession(): IWalletConnectSession | undefined {
  if (typeof window === 'undefined') return

  const local = window.localStorage
    ? window.localStorage.getItem('walletconnect')
    : null

  let session = null
  if (local) {
    session = JSON.parse(local)
  }
  return session
}

function deleteCachedLegacySession(): void {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem('walletconnect')
}
