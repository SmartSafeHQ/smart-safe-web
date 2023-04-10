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

import { StableCoinsSymbols } from '@utils/global/coins/stableCoinsConfig'

export type StableCoin = {
  symbol: StableCoinsSymbols
  avatar: string
  contractAddress: string
}

type FormInputs = {
  tokenSymbol: StableCoinsSymbols
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
