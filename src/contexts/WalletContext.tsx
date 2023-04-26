import { Web3OnboardProvider, init } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'
import { COINS_ATTRIBUTES } from '@/utils/web3/supportedChains'

import type { InitOptions } from '@web3-onboard/core'
import type { PropsWithChildren } from 'react'

export function WalletContextProvider({ children }: PropsWithChildren) {
  const injected = injectedModule()
  const wallets = [injected]

  const chains: InitOptions['chains'] = COINS_ATTRIBUTES.map(token => ({
    id: token.chainId,
    namespace: 'evm',
    rpcUrl: token.rpcUrl,
    token: token.symbol,
    label: token.networkName,
    icon: token.icon,
    blockExplorerUrl: token.explorerUrl
  }))

  const web3Onboard = init({
    wallets,
    chains,
    accountCenter: {
      desktop: {
        enabled: false
      },
      mobile: {
        enabled: false
      }
    },
    connect: {
      autoConnectLastWallet: true
    }
  })

  return (
    <Web3OnboardProvider web3Onboard={web3Onboard}>
      {children}
    </Web3OnboardProvider>
  )
}
