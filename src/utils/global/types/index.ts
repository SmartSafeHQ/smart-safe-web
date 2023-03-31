import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

import { errors as etherErrors } from 'ethers'

export type NextPageWithLayout<P = Record<string, string>, IP = P> = NextPage<
  P,
  IP
> & {
  getLayout?: (_page: ReactElement) => ReactNode
}

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

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
