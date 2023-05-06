import type { InitOptions } from '@web3-onboard/core'
import type { PropsWithChildren } from 'react'

import { Web3OnboardProvider, init } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'
import walletConnectModule from '@web3-onboard/walletconnect'
import trezorModule from '@web3-onboard/trezor'
import ledgerModule from '@web3-onboard/ledger'
import keystoneModule from '@web3-onboard/keystone'

import { CHAINS_ATTRIBUTES } from '@utils/web3/chains/supportedChains'

export function Web3OnboardContextProvider({ children }: PropsWithChildren) {
  const injected = injectedModule()
  const walletConnect = walletConnectModule()
  const trezor = trezorModule({
    appUrl: 'http://localhost:3000/',
    email: 'ricardo@gmail.com'
  })
  const ledger = ledgerModule()
  const keystone = keystoneModule()
  const wallets = [injected, walletConnect, trezor, ledger, keystone]

  const chains: InitOptions['chains'] = CHAINS_ATTRIBUTES.map(chain => ({
    id: chain.chainId,
    namespace: 'evm',
    rpcUrl: chain.rpcUrl,
    color: chain.hexColor,
    token: chain.symbol,
    label: chain.networkName,
    icon: chain.icon,
    blockExplorerUrl: chain.explorerUrl
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
    },
    theme: 'system'
  })

  return (
    <Web3OnboardProvider web3Onboard={web3Onboard}>
      {children}
    </Web3OnboardProvider>
  )
}
