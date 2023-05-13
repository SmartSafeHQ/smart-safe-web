import type { WalletState, DisconnectOptions } from '@web3-onboard/core'

import { useState } from 'react'
import { Copy } from '@phosphor-icons/react'
import { useSetChain } from '@web3-onboard/react'
import * as Popover from '@radix-ui/react-popover'
import * as Tooltip from '@radix-ui/react-tooltip'

import { formatWalletAddress } from '@utils/web3'
import { handleCopyToClipboard } from '@utils/clipboard'

interface Props {
  wallet: WalletState
  disconnect: (_options: DisconnectOptions) => Promise<WalletState[]>
}

export function Connected({ wallet, disconnect }: Props) {
  const [{ connectedChain }] = useSetChain()

  const [addressCopiedToClipboard, setAddressCopiedToClipboard] =
    useState(false)

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <p className="leading-[48px]">
          {formatWalletAddress({
            walletAddress: wallet.accounts[0].address
          })}
        </p>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content className=" flex flex-col gap-2 rounded-md border-1 border-stone-700 bg-gray-800">
          <div className="p-2">
            <div className="flex gap-2 items-center justify-center p-2 bg-gray-900">
              <p className="text-sm">
                {formatWalletAddress({
                  walletAddress: wallet.accounts[0].address
                })}
              </p>
              <Tooltip.Provider delayDuration={100}>
                <Tooltip.Root>
                  <Tooltip.Trigger
                    asChild
                    onClick={event => event.preventDefault()}
                  >
                    <Copy
                      size={20}
                      weight="fill"
                      className="cursor-pointer"
                      onClick={async () => {
                        await handleCopyToClipboard(wallet.accounts[0].address)
                        setAddressCopiedToClipboard(true)
                        setTimeout(() => {
                          setAddressCopiedToClipboard(false)
                        }, 1000)
                      }}
                    />
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      sideOffset={5}
                      onPointerDownOutside={event => event.preventDefault()}
                    >
                      <p className="bg-white rounded-md text-black p-1">
                        {addressCopiedToClipboard
                          ? 'Copied'
                          : 'Copy to clipboard'}
                      </p>
                      <Tooltip.Arrow className="TooltipArrow" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center gap-2 border-y-1 border-stone-700 px-2 py-1">
              <p className="text-xs">Wallet</p>

              <p className="text-sm">{wallet.label}</p>
            </div>

            <div className="flex justify-between items-center gap-10 border-b-1 border-stone-700 px-2 py-1">
              <p className="text-xs">Connected network</p>

              <p className="text-sm">{connectedChain?.id}</p>
            </div>
          </div>

          <div className="p-2">
            <button
              onClick={() => disconnect(wallet)}
              className="w-full font-bold p-1 rounded-md bg-red-800/[.2] text-red-500 hover:bg-red-300 hover:text-red-700 transition-colors"
            >
              Disconnect
            </button>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
