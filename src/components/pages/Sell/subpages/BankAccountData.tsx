import { Button } from '@components/Button'
import { TextInput } from '@/components/Inputs/TextInput'
import { AmountToWithdraw } from '../components/AmountToWithdraw'

import { useI18n } from '@/hooks/useI18n'
import { useSellContext } from '@/contexts/pages/SellContext'

import type { Dispatch, SetStateAction } from 'react'
import type { Screens } from '@/pages/dashboard/buy-and-sell/sell'

type Props = {
  setCurrentScreen: Dispatch<SetStateAction<Screens>>
}

export function BankAccountData({ setCurrentScreen }: Props) {
  const { t } = useI18n()
  const { register, errors, trigger } = useSellContext()

  async function handlePageChange() {
    const areFieldsValid = await trigger()

    if (!areFieldsValid) {
      return
    }

    setCurrentScreen('bank-account-data-confirmation')
  }

  return (
    <div className="flex flex-col gap-2">
      <AmountToWithdraw />

      <TextInput.Root htmlFor="cpf" error={errors.cpf?.message}>
        <TextInput.Label>{t.sell.inputs.cpf.label}</TextInput.Label>

        <TextInput.Content>
          <TextInput.Input
            {...register('cpf', {
              required: {
                value: true,
                message: t.sell.inputs.errorMessages.required
              }
            })}
            type="text"
            id="cpf"
            placeholder={t.sell.inputs.cpf.placeholder}
          />
        </TextInput.Content>
      </TextInput.Root>

      <TextInput.Root htmlFor="name" error={errors.name?.message}>
        <TextInput.Label>{t.sell.inputs.name.label}</TextInput.Label>

        <TextInput.Content>
          <TextInput.Input
            {...register('name', {
              required: {
                value: true,
                message: t.sell.inputs.errorMessages.required
              }
            })}
            type="text"
            id="name"
            placeholder={t.sell.inputs.name.placeholder}
          />
        </TextInput.Content>
      </TextInput.Root>

      <TextInput.Root htmlFor="branch" error={errors.branch?.message}>
        <TextInput.Label>{t.sell.inputs.branch.label}</TextInput.Label>

        <TextInput.Content>
          <TextInput.Input
            {...register('branch', {
              required: {
                value: true,
                message: t.sell.inputs.errorMessages.required
              }
            })}
            type="text"
            id="branch"
            placeholder={t.sell.inputs.branch.placeholder}
          />
        </TextInput.Content>
      </TextInput.Root>

      <div className="flex gap-2">
        <TextInput.Root
          htmlFor="accountNumber"
          error={errors.accountNumber?.message}
        >
          <TextInput.Label>{t.sell.inputs.accountNumber.label}</TextInput.Label>

          <TextInput.Content>
            <TextInput.Input
              {...register('accountNumber', {
                required: {
                  value: true,
                  message: t.sell.inputs.errorMessages.required
                }
              })}
              type="text"
              id="accountNumber"
              placeholder={t.sell.inputs.accountNumber.placeholder}
            />
          </TextInput.Content>
        </TextInput.Root>

        <TextInput.Root htmlFor="lastDigit" error={errors.lastDigit?.message}>
          <TextInput.Label>{t.sell.inputs.lastDigit.label}</TextInput.Label>

          <TextInput.Content>
            <TextInput.Input
              {...register('lastDigit', {
                required: {
                  value: true,
                  message: t.sell.inputs.errorMessages.required
                }
              })}
              type="text"
              id="lastDigit"
              placeholder={t.sell.inputs.lastDigit.placeholder}
            />
          </TextInput.Content>
        </TextInput.Root>
      </div>

      <Button onClick={handlePageChange}>{t.sell.bankDataConfirmation}</Button>
    </div>
  )
}
