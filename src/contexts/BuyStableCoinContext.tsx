import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState
} from 'react'

import {
  ACCEPTED_CURRENCIES,
  ACCEPTED_TOKENS,
  CurrencySymbol,
  TokenSymbol
} from '@utils/stableCoinsUtils'

type BuyStableCoinProviderProps = PropsWithChildren<Record<string, unknown>>

interface CurrencyProps {
  amount: number
  symbol: CurrencySymbol
  currency: string
}

interface TokenProps {
  symbol: TokenSymbol
  parityCurrencySymbol: CurrencySymbol
  contractAddress: string
  contractName: string
  networkRpcUrl: string
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
  const [token, setToken] = useState<TokenProps>(ACCEPTED_TOKENS[0])

  return (
    <BuyStableCoinContext.Provider
      value={{
        currency,
        setCurrency,
        token,
        setToken
      }}
    >
      {children}
    </BuyStableCoinContext.Provider>
  )
}

export const useBuyStableCoin = () => useContext(BuyStableCoinContext)
