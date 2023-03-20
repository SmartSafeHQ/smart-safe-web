import { errors as etherErrors } from 'ethers'

export class EthereumError extends Error {
  code: etherErrors = etherErrors.UNKNOWN_ERROR
}

export type CustomerProps = {
  id: number
  cognitoId: string
  name: string
  email: string
  wallets: {
    evm: {
      address: string
      formattedAddress: string
      privateKey: string
    }
    solana: {
      address: string
      formattedAddress: string
      privateKey: string
    }
  }
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
