import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

import type { ErrorCode } from 'ethers'

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
  code: ErrorCode = 'UNKNOWN_ERROR'
}

export interface EthereumErrorProps {
  code: string
  message: string
}
