import { toast } from 'react-toastify'

import type { EthereumError } from '@utils/types'
import { ethereumErrorsList } from '@utils/web3/errors/EthereumErrorsList'

export function getWe3ErrorMessageWithToast(e: unknown) {
  console.error(e)

  const code = (e as EthereumError)?.code

  const errorMessage = ethereumErrorsList.get(code)?.message

  toast.error(
    errorMessage ?? 'An unknown error occurred. Please try again later.'
  )

  return errorMessage
}
