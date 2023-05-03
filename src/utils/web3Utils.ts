import { toast } from 'react-toastify'

import type { EthereumError, SupportedNetworks } from '@utils/global/types'

const formatAdressFunctions = new Map<
  SupportedNetworks,
  (_address: string) => string
>([
  ['evm', address => `${address.slice(0, 6)}...${address.slice(-4)}`],
  ['solana', address => `${address.slice(0, 4)}...${address.slice(-4)}`],
  [
    'bitcoin',
    address => `${address.substring(0, 4)}...${address.substring(30)}`
  ]
])

export function formatWalletAddress({
  network,
  walletAddress
}: {
  network: SupportedNetworks
  walletAddress: string
}) {
  const formatFunction =
    formatAdressFunctions.get(network) ??
    (formatAdressFunctions.get('evm') as (_address: string) => string)

  return formatFunction(walletAddress)
}

export function getWe3ErrorMessageWithToast(e: unknown) {
  const errorMessage = (e as EthereumError)?.message

  toast.error(errorMessage)

  return errorMessage
}
