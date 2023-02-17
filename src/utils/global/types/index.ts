import { errors as etherErrors } from 'ethers'

export class EthereumError extends Error {
  code: etherErrors = etherErrors.UNKNOWN_ERROR
}

export interface EthereumErrorProps {
  code: string
  message: string
}
