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
  StableCoinsSymbols
} from '@utils/global/coins/stableCoinsConfig'

type BuyStableCoinProviderProps = PropsWithChildren<Record<string, unknown>>

interface CurrencyProps {
  amount: number
  symbol: CurrencySymbols
  currency: string
}

interface TokenProps {
  symbol: StableCoinsSymbols
  avatar: string
  parityCurrencySymbol: CurrencySymbols
  contractAddress: string
  contractName: string
  rpcUrl: string
}

type BuyStableCoinContextData = {
  currency: CurrencyProps
  token: TokenProps
  setCurrency: Dispatch<SetStateAction<CurrencyProps>>
  setToken: Dispatch<SetStateAction<TokenProps>>
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
  const [token, setToken] = useState<TokenProps>(STABLE_COINS[0])

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
