import { toast, ToastPosition } from 'react-toastify'

import { EthereumError } from '@utils/global/types'

export function handleCopyToClipboard(contentToCopy: string) {
  navigator.clipboard.writeText(contentToCopy)
}

export function handleCopyToClipboardToastMessage(
  contentToCopy: string,
  message: string,
  toastPosition: ToastPosition = 'bottom-center',
  autoClose = 2000
) {
  navigator.clipboard.writeText(contentToCopy)

  toast.info(message, {
    position: toastPosition,
    hideProgressBar: true,
    autoClose
  })
}

export function formatCurrencyToNumber(currency: string) {
  return Number(currency.replace(/[^0-9.]+/g, ''))
}

export function getEthersErrorCode(error: unknown) {
  const code = (error as EthereumError)?.code

  if (!code) {
    return
  }

  return code
}
