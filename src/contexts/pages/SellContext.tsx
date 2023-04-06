import { useIMask } from 'react-imask'
import { createContext, useContext } from 'react'
import { FieldErrors, UseFormReset, useForm } from 'react-hook-form'

import type { IMask } from 'react-imask'
import type {
  UseFormRegister,
  UseFormWatch,
  UseFormTrigger,
  UseFormGetValues,
  UseFormSetValue
} from 'react-hook-form'
import type { PropsWithChildren, ChangeEvent, RefObject } from 'react'

export type StableCoin = {
  name: 'IBRL' | 'IEUR'
  symbol: 'IBRL' | 'IEUR'
  iconUrl: string
  address: string
}

type FormInputs = {
  tokenSymbol: 'IBRL' | 'IEUR'
  amountToWithdraw: string
  bankId: string
  cpf: string
  name: string
  branch: string
  accountNumber: string
  lastDigit: string
  selectedStableCoin: StableCoin
}

type SellContextProps = {
  handleOnChangeAmountToWithdraw: (
    _event: ChangeEvent<HTMLInputElement>
  ) => void
  handleSetDropDownInputValue: (
    _value: string,
    _field: keyof FormInputs
  ) => void
  amountToWithdrawRef: RefObject<HTMLInputElement>
  register: UseFormRegister<FormInputs>
  watch: UseFormWatch<FormInputs>
  errors: FieldErrors<FormInputs>
  getValues: UseFormGetValues<FormInputs>
  trigger: UseFormTrigger<FormInputs>
  setValue: UseFormSetValue<FormInputs>
  reset: UseFormReset<FormInputs>
}

const SellContext = createContext<SellContextProps>({} as SellContextProps)

export const STABLE_COINS: StableCoin[] = [
  {
    name: 'IEUR',
    symbol: 'IEUR',
    iconUrl: '/favicon.svg',
    address: '0xa59f1Ad80e774e00dFb0cebdD70CB9A224b2d6E7'
  },
  {
    name: 'IBRL',
    symbol: 'IBRL',
    iconUrl: '/favicon.svg',
    address: '0x78487e03f5e30aA3B6F72105cE247dEC80554418'
  }
]

export function SellContextProvider({ children }: PropsWithChildren) {
  const {
    register,
    setValue,
    watch,
    trigger,
    getValues,
    formState: { errors },
    reset
  } = useForm<FormInputs>()

  const maskOptions: IMask.AnyMaskedOptions = {
    mask: Number,
    scale: 2,
    signed: true,
    padFractionalZeros: true,
    radix: ',',
    mapToRadix: ['.'],
    min: 0
  }
  const {
    ref: amountToWithdrawRef,
    setValue: setAmountToWithdraw,
    unmaskedValue: rawAmountToWithdraw
  } = useIMask(maskOptions)

  function handleOnChangeAmountToWithdraw({
    target: { value }
  }: ChangeEvent<HTMLInputElement>) {
    setAmountToWithdraw(value)
    setValue('amountToWithdraw', rawAmountToWithdraw)
  }

  function handleSetDropDownInputValue(value: string, field: keyof FormInputs) {
    setValue(field, value)
  }

  return (
    <SellContext.Provider
      value={{
        handleOnChangeAmountToWithdraw,
        amountToWithdrawRef,
        register,
        watch,
        trigger,
        getValues,
        errors,
        setValue,
        handleSetDropDownInputValue,
        reset
      }}
    >
      {children}
    </SellContext.Provider>
  )
}

export const useSellContext = () => useContext(SellContext)
