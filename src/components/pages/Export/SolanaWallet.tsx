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
  return (
    <div>
      {tokensStatus && (
        <Checkbox
          htmlFor="sol"
          label="Solana"
          onChange={handleUpdateSingleCheckbox}
          isChecked={
            tokensStatus.find(token => token.token.symbol === 'sol')?.checked ||
            false
          }
        />
      )}
    </div>
  )
}
