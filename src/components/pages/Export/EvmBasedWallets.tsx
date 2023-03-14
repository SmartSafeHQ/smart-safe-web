import { useState } from 'react'

import { Checkbox } from './Checkbox'

import type { TokensStatus } from '@hooks/export/interfaces'
import type { Dispatch, SetStateAction, ChangeEvent } from 'react'

type Props = {
  tokensStatus: TokensStatus[] | undefined
  setTokensStatus: Dispatch<SetStateAction<TokensStatus[] | undefined>>
  handleUpdateSingleCheckbox: (_event: ChangeEvent<HTMLInputElement>) => void
}

export function EvmBasedWallets({
  tokensStatus,
  setTokensStatus,
  handleUpdateSingleCheckbox
}: Props) {
  const [isMainCheckboxChecked, setIsMainCheckboxChecked] = useState(false)

  function handleUpdateAllEvmBasedCheckboxes() {
    const updaterFunction = (
      currentTokensStatus: TokensStatus[] | undefined
    ) => {
      if (currentTokensStatus) {
        // we should mutate only EVM-based chains
        // solana and other chains should stay untouched
        const evmChains = ['eth', 'bnb', 'matic', 'celo', 'avax']

        return currentTokensStatus.map(({ token, checked }) => {
          if (evmChains.includes(token.symbol)) {
            return { token, checked: !isMainCheckboxChecked }
          }

          return { token, checked }
        })
      }
    }

    setTokensStatus(updaterFunction)
    setIsMainCheckboxChecked(!isMainCheckboxChecked)
  }

  return (
    <div className="grid grid-cols-[20px_minmax(200px,_1fr)] gap-1 gap-y-2">
      <Checkbox
        label="EVM-based"
        htmlFor="evm-chains"
        isChecked={isMainCheckboxChecked}
        className="col-span-full row-span-1"
        onChange={handleUpdateAllEvmBasedCheckboxes}
      />

      {tokensStatus
        ?.filter(({ token }) => token.symbol !== 'sol')
        ?.map(({ token, checked }) => (
          <div key={token.symbol} className="col-start-2 col-end-4">
            <Checkbox
              isChecked={checked}
              label={token.network}
              iconUrl={token.avatar}
              htmlFor={token.symbol}
              onChange={handleUpdateSingleCheckbox}
            />
          </div>
        ))}
    </div>
  )
}
