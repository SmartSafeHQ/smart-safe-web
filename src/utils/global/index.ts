import { toast, ToastPosition } from 'react-toastify'

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
