import { IWalletConnectSession } from '@walletconnect/legacy-types'
import LegacySignClient from '@walletconnect/client'

import { EIP155_SIGNING_METHODS } from '@utils/walletConnect'
import { approveEIP155Request } from '@utils/walletConnect/EIP155RequestHandlerUtil'

export let legacySignClient: LegacySignClient

export function createLegacySignClient({ uri }: { uri?: string } = {}) {
  // If URI is passed always create a new session,
  // otherwise fall back to cached session if client isn't already instantiated.
  if (uri) {
    deleteCachedLegacySession()
    legacySignClient = new LegacySignClient({ uri })
  } else if (!legacySignClient && getCachedLegacySession()) {
    const session = getCachedLegacySession()
    legacySignClient = new LegacySignClient({ session })
  } else {
    return
  }

  legacySignClient.on('session_request', (error, payload) => {
    if (error) {
      throw new Error(`legacySignClient > session_request failed: ${error}`)
    }

    console.log('LegacySessionProposalModal', { legacyProposal: payload })

    const { chainId } = payload

    legacySignClient.approveSession({
      accounts: ['0x574E1D58B0208f7EbB12851FDab54ab06bb5cd45'],
      chainId: chainId ?? 1
    })
  })

  legacySignClient.on('connect', () => {
    console.log('legacySignClient > connect')
  })

  legacySignClient.on('error', error => {
    throw new Error(`legacySignClient > on error: ${error}`)
  })

  legacySignClient.on('call_request', (error, payload) => {
    if (error) {
      throw new Error(`legacySignClient > call_request failed: ${error}`)
    }
    onCallRequest(payload)
  })

  legacySignClient.on('disconnect', async () => {
    deleteCachedLegacySession()
  })
}

const onCallRequest = async (payload: {
  id: number
  method: string
  params: any[]
}) => {
  switch (payload.method) {
    case EIP155_SIGNING_METHODS.ETH_SIGN:
    case EIP155_SIGNING_METHODS.PERSONAL_SIGN: {
      // up modal

      const test = {
        id: payload.id,
        topic: '',
        params: {
          request: { method: payload.method, params: payload.params },
          chainId: '1'
        }
      }

      const { result } = await approveEIP155Request('aa', test)

      legacySignClient.approveRequest({
        id: payload.id,
        result
      })

      return
    }

    case EIP155_SIGNING_METHODS.ETH_SIGN_TYPED_DATA:
    case EIP155_SIGNING_METHODS.ETH_SIGN_TYPED_DATA_V3:
    case EIP155_SIGNING_METHODS.ETH_SIGN_TYPED_DATA_V4: {
      return console.log('LegacySessionSignTypedDataModal', {
        legacyCallRequestEvent: payload,
        legacyRequestSession: legacySignClient.session
      })
    }

    case EIP155_SIGNING_METHODS.ETH_SEND_TRANSACTION:
    case EIP155_SIGNING_METHODS.ETH_SIGN_TRANSACTION: {
      return console.log('LegacySessionSendTransactionModal', {
        legacyCallRequestEvent: payload,
        legacyRequestSession: legacySignClient.session
      })
    }

    default: {
      alert(`${payload.method} is not supported for WalletConnect v1`)
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
