import type { InitOptions } from '@web3-onboard/core'

import * as Popover from '@radix-ui/react-popover'

import { UnsupportedNetwork } from './UnsupportedNetwork'

import { useConnectWallet, useSetChain } from '@web3-onboard/react'

import { CHAINS_ATTRIBUTES } from '@utils/web3/chains/supportedChains'
import { getWe3ErrorMessageWithToast } from '@utils/web3/errors'

export function Network() {
  const [{ wallet }] = useConnectWallet()
  const [, setChain] = useSetChain()

  const supportedChains: InitOptions['chains'] = CHAINS_ATTRIBUTES.map(
    token => ({
      id: token.chainId,
      namespace: 'evm',
      rpcUrl: token.rpcUrl,
      token: token.symbol,
      label: token.networkName,
      icon: token.icon,
      blockExplorerUrl: token.explorerUrl
    })
  )

  async function handleChainChange(chainId: string) {
    try {
      await setChain({ chainId })
    } catch (error) {
      getWe3ErrorMessageWithToast(error)
    }
  }

  const chainName = supportedChains.find(chain => {
    return wallet?.chains.find(({ id }) => id === chain.id)?.id
  })?.label

  return (
    <div className="px-3">
      <Popover.Root>
        <Popover.Trigger asChild>
          {chainName ? (
            <button className="leading-[48px]">{chainName}</button>
          ) : (
            <UnsupportedNetwork />
          )}
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content className="flex flex-col gap-2 rounded-md border-1 border-stone-700 bg-gray-800">
            {supportedChains.map(chain => (
              <button
                key={chain.id}
                className="hover:bg-slate-400/[.1] px-2 py-1"
                onClick={async () =>
                  await handleChainChange(chain.id as string)
                }
              >
                {chain.label}
              </button>
            ))}
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  )
}
