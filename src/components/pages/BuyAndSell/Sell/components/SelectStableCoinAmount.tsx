import { Coin } from 'phosphor-react'

import { useI18n } from '@hooks/useI18n'
import { useSellContext } from '@contexts/pages/SellContext'

import { AmountToWithdraw } from './AmountToWithdraw'
import { TextInput } from '@/components/Inputs/TextInput'

export function SelectStableCoinAmount() {
  const { t } = useI18n()
  const {
    errors,
    register,
    amountToWithdrawRef,
    handleOnChangeAmountToWithdraw
  } = useSellContext()

  return (
    <div className="flex flex-col gap-2">
      <TextInput.Root
        htmlFor="amountToWithdraw"
        error={errors.amountToWithdraw?.message}
      >
        <TextInput.Label>{t.sell.amountToWithdraw}</TextInput.Label>

        <TextInput.Content>
          <TextInput.Icon>
            <Coin size={32} />
          </TextInput.Icon>

          <TextInput.Input
            {...register('amountToWithdraw', {
              required: {
                value: true,
                message: t.sell.inputs.errorMessages.required
              },
              onChange: handleOnChangeAmountToWithdraw
            })}
            ref={amountToWithdrawRef}
            type="text"
            id="amountToWithdraw"
            placeholder={t.sell.amountOfTokensToWithdraw}
          />
        </TextInput.Content>
      </TextInput.Root>

      <AmountToWithdraw />
    </div>
  )
}
