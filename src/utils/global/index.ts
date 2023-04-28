import { AxiosError } from 'axios'
import { toast, ToastPosition } from 'react-toastify'

export async function handleCopyToClipboard(contentToCopy: string) {
  await navigator.clipboard.writeText(contentToCopy)
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

export function getAxiosErrorMessageWithToast(error: unknown) {
  let errorMessage = (error as Error).message

  if (error instanceof AxiosError && error?.response?.data) {
    errorMessage = error.response.data?.message
  }

  toast.error(errorMessage)

  return errorMessage
}
