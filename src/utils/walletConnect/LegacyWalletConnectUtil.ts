import {
  IWalletConnectSession,
  ISessionParams
} from '@walletconnect/legacy-types'
import LegacySignClient from '@walletconnect/client'

import { EIP155_SIGNING_METHODS } from '@utils/walletConnect'
import { approveEIP155Request } from '@utils/walletConnect/EIP155RequestHandlerUtil'
import { ApproveSessionDataProps } from '@hooks/accounts/useWcLogin'

interface CreateLegacySignClientProps {
  uri?: string
  setSessionData: (_data: ApproveSessionDataProps) => void
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
  setSessionData: (_data: ApproveSessionDataProps) => void
}

export function createLegacySignClient({
  uri,
  setSessionData,
  setSignClient,
  wallet
}: CreateLegacySignClientProps) {
  if (!wallet) return

  let legacySignClient: LegacySignClient | null = null

  if (uri) {
    deleteCachedLegacySession()
    legacySignClient = new LegacySignClient({ uri })
  } else if (!legacySignClient && getCachedLegacySession()) {
    const session = getCachedLegacySession()
    legacySignClient = new LegacySignClient({ session })
  } else {
    return
  }

  setSignClient(legacySignClient)

  legacySignClient.on(
    'session_request',
    (error, payload: { id: number; params: ISessionParams[] }) => {
      if (error) {
        throw new Error(`legacySignClient > session_request failed: ${error}`)
      }

      setSessionData({
        id: payload.id,
        isModalOpen: true,
        apiVersion: 1,
        chainId: payload.params[0].chainId ?? undefined,
        description: payload.params[0].peerMeta?.description,
        avatarUrl: payload.params[0].peerMeta?.icons[0],
        name: payload.params[0].peerMeta?.name,
        url: payload.params[0].peerMeta?.url
      })
    }
  )

  legacySignClient.on('error', error => {
    throw new Error(`legacySignClient > on error: ${error}`)
  })

  legacySignClient.on('call_request', (error, payload) => {
    if (error) {
      throw new Error(`legacySignClient > call_request failed: ${error}`)
    }

    onCallRequest({
      ...payload,
      legacySignClient,
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
  method,
  params,
  walletPrivateKey
}: OnCallRequestProps) => {
  switch (method) {
    case EIP155_SIGNING_METHODS.ETH_SIGN:
    case EIP155_SIGNING_METHODS.PERSONAL_SIGN: {
      // up sign request modal
      console.log('session request event (legacy) =>', { id, method, params })

      const requestEvent = {
        id,
        topic: '',
        params: {
          request: { method, params },
          chainId: '1'
        }
      }

      const { result } = await approveEIP155Request(
        walletPrivateKey,
        requestEvent
      )

      legacySignClient.approveRequest({
        id,
        result
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
      alert(`${method} is not supported for WalletConnect v1`)
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
