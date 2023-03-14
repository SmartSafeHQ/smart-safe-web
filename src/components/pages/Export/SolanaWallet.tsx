import { Checkbox } from './Checkbox'

import type { TokensStatus } from '@hooks/export/interfaces'
import type { ChangeEvent } from 'react'

type Props = {
  tokensStatus: TokensStatus[] | undefined
  handleUpdateSingleCheckbox: (_event: ChangeEvent<HTMLInputElement>) => void
}

export function SolanaWallet({
  tokensStatus,
  handleUpdateSingleCheckbox
}: Props) {
  const solanaChain = tokensStatus?.find(token => token.token.symbol === 'sol')

  return (
    <div>
      {tokensStatus && (
        <Checkbox
          iconUrl={solanaChain?.token.avatar}
          htmlFor="sol"
          label="Solana"
          onChange={handleUpdateSingleCheckbox}
          isChecked={solanaChain?.checked || false}
        />
      )}
    </div>
  )
}
