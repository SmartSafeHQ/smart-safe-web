import LegacySignClient from '@walletconnect/client'

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

export function createLegacySignClient({
  wallet
}: CreateLegacySignClientProps) {
  if (!wallet) return
  console.log(wallet)
}
