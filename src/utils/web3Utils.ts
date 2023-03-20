import { toast } from 'react-toastify'

import { SupportedLanguages } from '@utils/global/constants/i18n'
import { pt } from '@/locales/pt'
import { locales } from '@/locales'
import { EthereumError } from '@/utils/global/types'

export function formatWalletAddress(
  address: string,
  firstCharsCount = 6,
  lastCharsCount = 4
) {
  return `${address.slice(0, firstCharsCount)}...${address.slice(
    -lastCharsCount
  )}`
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
