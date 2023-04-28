import { toast } from 'react-toastify'

import { SupportedLanguages } from '@utils/global/constants/i18n'
import { pt } from '@/locales/pt'
import { locales } from '@/locales'
import type { EthereumError, SupportedNetworks } from '@/utils/global/types'

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

export function getWe3ErrorMessageWithToast(
  e: unknown,
  locale: SupportedLanguages
) {
  const code = (e as EthereumError)?.code

  const t = locales.get(locale)?.errors ?? pt.errors
  const errorMessage = t.web3E.get(code)?.message

  toast.error(errorMessage ?? t.default)

  return errorMessage
}
