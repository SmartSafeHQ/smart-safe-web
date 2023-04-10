import { AmountToWithdraw } from './AmountToWithdraw'
import { TextInput } from '@components/Inputs/TextInput'

import { useI18n } from '@hooks/useI18n'
import { useSelectSellCoin } from '@hooks/buyAndSell/sell/useSelectSellCoin'
import { useSellStableCoin } from '@contexts/SellStableCoinContext'

export function SelectStableCoinAmount() {
  const { t } = useI18n()
  const { errors, register } = useSelectSellCoin()
  const { amountToWithdrawRef } = useSellStableCoin()

  return (
    <div className="flex flex-col gap-2">
      <TextInput.Root htmlFor="amountToWithdraw" error={errors.amount?.message}>
        <TextInput.Label>{t.sell.amountToWithdraw}</TextInput.Label>

        <TextInput.Content>
          <TextInput.Input
            {...register('amount', {
              required: {
                value: true,
                message: t.sell.inputs.errorMessages.required
              }
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
