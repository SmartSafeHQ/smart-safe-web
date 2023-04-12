import { useIMask } from 'react-imask'
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState
} from 'react'

import type { IMask } from 'react-imask'
import type { PropsWithChildren, RefObject } from 'react'

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
  amountToWithdrawRef: RefObject<HTMLInputElement>
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
  const maskOptions: IMask.AnyMaskedOptions = {
    mask: Number,
    scale: 2,
    signed: true,
    padFractionalZeros: true,
    radix: ',',
    mapToRadix: ['.'],
    min: 0
  }

  const { ref: amountToWithdrawRef } = useIMask(maskOptions)

  const [selectedStableCoin, setSelectedStableCoin] =
    useState<StableCoinsProps>(STABLE_COINS[0])
  const [bankAccount, setBankAccount] =
    useState<SellBankAccountFieldValues | null>(null)
  const [withdrawAmount, setWithdrawAmount] = useState(0)

  return (
    <SellStableCoinContext.Provider
      value={{
        amountToWithdrawRef,
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
