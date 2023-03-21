import { errors as etherErrors } from 'ethers'

export class EthereumError extends Error {
  code: etherErrors = etherErrors.UNKNOWN_ERROR
}

export type SupportedNetworks = 'evm' | 'solana' | 'bitcoin'

export interface WalletKeypair {
  address: string
  privateKey: string
}

export type CustomerProps = {
  id: number
  cognitoId: string
  name: string
  email: string
  wallets: {
    evm: WalletKeypair & { formattedAddress: string }
    solana: WalletKeypair & { formattedAddress: string }
    bitcoin: WalletKeypair & { formattedAddress: string }
  }
}

export interface FetchEndUserWalletsResponse {
  id: number
  evm: WalletKeypair[]
  solana: WalletKeypair[]
  bitcoin: WalletKeypair[]
}

export interface EthereumErrorProps {
  code: string
  message: string
}
