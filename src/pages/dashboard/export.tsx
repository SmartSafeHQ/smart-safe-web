import { useState, useEffect } from 'react'

import { Heading } from '@components/Heading'
import { Checkbox } from '@components/pages/Export/Checkbox'
import { Button } from '@components/Button'

import { useI18n } from '@hooks/useI18n'
import { useAuth } from '@contexts/AuthContext'
import { useCustomerCoins } from '@hooks/global/coins/queries/useCustomerCoins'

import type { ChangeEvent } from 'react'

type TokensStatus = {
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

export default function Export() {
  const { t } = useI18n()
  const { customer } = useAuth()
  const { data: tokens } = useCustomerCoins(customer?.wallets.evm.address)

  const [tokensStatus, setTokensStatus] = useState<TokensStatus[]>()

  function handleUpdateSingleCheckbox(event: ChangeEvent<HTMLInputElement>) {
    setTokensStatus(currentTokensStatus => {
      if (currentTokensStatus) {
        return currentTokensStatus.map(({ token, checked }) => {
          if (token.symbol === event.target.id) {
            return { checked: !checked, token }
          }

          return { token, checked }
        })
      }
    })
  }

  function handleUpdateAllCheckboxes(checked: boolean) {
    const updaterFunction = (
      currentTokensStatus: TokensStatus[] | undefined
    ) => {
      if (currentTokensStatus) {
        return currentTokensStatus.map(({ token }) => {
          return { token, checked }
        })
      }
    }

    setTokensStatus(updaterFunction)
  }

  // it adds the `checked` field to the tokens list
  // { tokens: {}[], checked: boolean }
  useEffect(() => {
    if (tokens?.coins) {
      const checkboxesStatus = tokens.coins.map(token => {
        return { token, checked: false }
      })

      setTokensStatus(checkboxesStatus)
    }
  }, [tokens?.coins])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Heading className="text-center text-xl">
          {t.exportPrivateKeys.heading}
        </Heading>

        <p className="text-center text-sm">{t.exportPrivateKeys.description}</p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <Button
            className="h-8"
            onClick={() => handleUpdateAllCheckboxes(true)}
          >
            {t.exportPrivateKeys.checkboxes.checkAll}
          </Button>

          <Button
            className="h-8"
            onClick={() => handleUpdateAllCheckboxes(false)}
          >
            {t.exportPrivateKeys.checkboxes.uncheckAll}
          </Button>
        </div>

        <div>
          {tokensStatus?.map(({ token, checked }) => (
            <div key={token.symbol}>
              <Checkbox
                onChange={handleUpdateSingleCheckbox}
                isChecked={checked}
                label={token.network}
                htmlFor={token.symbol}
              />
            </div>
          ))}
        </div>
      </div>

      <Button>{t.exportPrivateKeys.export}</Button>
    </div>
  )
}
