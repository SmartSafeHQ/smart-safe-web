import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState
} from 'react'

import type { PropsWithChildren } from 'react'

import {
  STABLE_COINS,
  StableCoinsProps,
  StableCoinsSymbols
} from '@utils/global/coins/stableCoinsConfig'
import { SellBankAccountFieldValues } from '@hooks/buyAndSell/sell/useBankAccountSell'

export type StableCoin = {
  symbol: StableCoinsSymbols
  avatar: string
  contractAddress: string
}

type SellStableCoinContextProps = {
  selectedStableCoin: StableCoinsProps
  withdrawAmount: number
  bankAccount: SellBankAccountFieldValues | null
  setSelectedStableCoin: Dispatch<SetStateAction<StableCoinsProps>>
  setWithdrawAmount: Dispatch<SetStateAction<number>>
  setBankAccount: Dispatch<SetStateAction<SellBankAccountFieldValues | null>>
}

const SellStableCoinContext = createContext<SellStableCoinContextProps>(
  {} as SellStableCoinContextProps
)

export function SellStableCoinContextProvider({ children }: PropsWithChildren) {
  const [selectedStableCoin, setSelectedStableCoin] =
    useState<StableCoinsProps>(STABLE_COINS[0])
  const [bankAccount, setBankAccount] =
    useState<SellBankAccountFieldValues | null>(null)
  const [withdrawAmount, setWithdrawAmount] = useState(0)

  return (
    <SellStableCoinContext.Provider
      value={{
        selectedStableCoin,
        setSelectedStableCoin,
        withdrawAmount,
        setWithdrawAmount,
        bankAccount,
        setBankAccount
      }}
    >
      {children}
    </SellStableCoinContext.Provider>
  )
}

export const useSellStableCoin = () => useContext(SellStableCoinContext)
