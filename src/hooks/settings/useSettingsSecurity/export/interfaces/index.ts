export type Chains = 'solana' | 'evm' | 'bitcoin'
export type Screens = 'select-chain' | 'private-keys-list'

export interface ChainProps {
  id: Chains
  name: string
  iconPath: string
}

export interface ChainPrivateKeysProps {
  name: string
  iconPath: string
  privateKey: string
}
