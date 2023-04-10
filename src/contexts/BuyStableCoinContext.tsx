import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState
} from 'react'

import { ACCEPTED_CURRENCIES } from '@utils/stableCoinsUtils'
import {
  STABLE_COINS,
  CurrencySymbols,
  StableCoinsProps
} from '@utils/global/coins/stableCoinsConfig'

type BuyStableCoinProviderProps = PropsWithChildren<Record<string, unknown>>

interface CurrencyProps {
  amount: number
  symbol: CurrencySymbols
  currency: string
}

type BuyStableCoinContextData = {
  currency: CurrencyProps
  token: StableCoinsProps
  setCurrency: Dispatch<SetStateAction<CurrencyProps>>
  setToken: Dispatch<SetStateAction<StableCoinsProps>>
}

const BuyStableCoinContext = createContext({} as BuyStableCoinContextData)

export function BuyStableCoinProvider({
  children
}: BuyStableCoinProviderProps) {
  const [currency, setCurrency] = useState<CurrencyProps>({
    amount: 0,
    symbol: ACCEPTED_CURRENCIES[0].symbol,
    currency: ACCEPTED_CURRENCIES[0].currency
  })
  const [token, setToken] = useState<StableCoinsProps>(STABLE_COINS[0])

  return (
    <BuyStableCoinContext.Provider
      value={{
        currency,
        token,
        setCurrency,
        setToken
      }}
    >
      {children}
    </BuyStableCoinContext.Provider>
  )
}

export const useBuyStableCoin = () => useContext(BuyStableCoinContext)
