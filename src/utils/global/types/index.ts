import { errors as etherErrors } from 'ethers'

export class EthereumError extends Error {
  code: etherErrors = etherErrors.UNKNOWN_ERROR
}

export interface WalletKeypair {
  address: string
  privateKey: string
}

export interface FetchEndUserWalletsResponse {
  id: number
  evm: WalletKeypair[]
  solana: WalletKeypair[]
}

export interface EthereumErrorProps {
  code: string
  message: string
}
