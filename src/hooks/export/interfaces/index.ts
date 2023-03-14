export type TokensStatus = {
  checked: boolean
  token: {
    symbol: string
    network: string
    avatar: string
    chainId: number | null
    decimals: number
    rpcUrl: string
    explorerUrl: string
    scanUrl: string
  }
}

export type Screens = 'checkbox-screen' | 'private-keys-list-screen'
