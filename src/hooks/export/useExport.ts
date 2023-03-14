import { useState, useEffect } from 'react'

import { useAuth } from '@contexts/AuthContext'
import { useCustomerCoins } from '@hooks/global/coins/queries/useCustomerCoins'

import type { ChangeEvent } from 'react'
import type { TokensStatus, Screens } from './interfaces'

export function useExport() {
  const [tokensStatus, setTokensStatus] = useState<TokensStatus[]>()
  const [currentScreen, setCurrentScreen] = useState<Screens>('checkbox-screen')

  const { customer } = useAuth()
  const { data: tokens } = useCustomerCoins(customer?.wallets.evm.address)

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

  return {
    currentScreen,
    setCurrentScreen,
    tokensStatus,
    setTokensStatus,
    handleUpdateAllCheckboxes,
    handleUpdateSingleCheckbox
  }
}
