import { toast } from 'react-toastify'

import type { EthereumError } from '@utils/types'

export function formatWalletAddress({
  walletAddress
}: {
  walletAddress: string
}) {
  const formattedAddress = `${walletAddress.slice(
    0,
    6
  )}...${walletAddress.slice(-4)}`

  return formattedAddress
}

export function getWe3ErrorMessageWithToast(e: unknown) {
  const errorMessage = (e as EthereumError)?.message

  toast.error(errorMessage)

  return errorMessage
}
