import { toast } from 'react-toastify'

import { SupportedLanguages } from '@utils/global/constants/i18n'
import { pt } from '@/locales/pt'
import { locales } from '@/locales'
import { EthereumError } from '@/utils/global/types'

export function formatWalletAddress({
  network,
  walletAddress
}: {
  network: 'solana' | 'evm' | 'bitcoin'
  walletAddress: string
}) {
  switch (network) {
    case 'evm': {
      return `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
    }
    case 'solana': {
      return `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`
    }
    case 'bitcoin': {
      return `${walletAddress?.substring(0, 4)}...${walletAddress?.substring(
        30
      )}`
    }
    default: {
      return ''
    }
  }
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
