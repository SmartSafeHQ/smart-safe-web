import Image from 'next/image'

import { Text } from '@components/Text'
import { Back } from '../components/Back'
import { Button } from '@components/Button'
import { Heading } from '@/components/Heading'
import { TextInput } from '@/components/Inputs/TextInput'
import { SelectInput } from '@/components/Inputs/SelectInput'
import { AmountToWithdraw } from '../components/AmountToWithdraw'

import { useI18n } from '@/hooks/useI18n'
import { useSellContext } from '@/contexts/pages/SellContext'

import type { Dispatch, SetStateAction } from 'react'
import type { Screens } from '@/pages/dashboard/buy-and-sell/sell'

type Props = {
  setCurrentScreen: Dispatch<SetStateAction<Screens>>
}

export const BANKS = [
  { bankId: '260', name: 'NuBank', iconUrl: '/banks/nubank.png' },
  { bankId: '341', name: 'Itaú Unibanco', iconUrl: '/banks/itau.png' },
  { bankId: '33', name: 'Santander', iconUrl: '/banks/santander.png' }
]

export function BankAccountData({ setCurrentScreen }: Props) {
  const { t } = useI18n()
  const { register, errors, trigger, getValues, handleSetDropDownInputValue } =
    useSellContext()

  async function handlePageChange() {
    const areFieldsValid = await trigger()

    console.log(getValues())

    if (!areFieldsValid) {
      return
    }

    setCurrentScreen('bank-account-data-confirmation')
  }

  return (
    <div className="flex flex-col gap-2">
      <Back page="stable-coin-amount" setCurrentScreen={setCurrentScreen} />

      <div className="mb-4">
        <Heading className="text-3xl">
          {t.sell.headings.bankAccountData}
        </Heading>
      </div>

      <AmountToWithdraw />

      <label>
        <p className="font-bold">{t.sell.inputs.bank.label}</p>

        <SelectInput.Root
          className="w-full"
          defaultValue="0"
          onValueChange={value => handleSetDropDownInputValue(value, 'bankId')}
        >
          <SelectInput.Trigger className="min-h-[3rem] py-1 bg-gray-200 dark:bg-gray-800" />

          <SelectInput.Content className="bg-gray-200 dark:bg-gray-800">
            <SelectInput.Group>
              {BANKS.map(bank => (
                <SelectInput.Item
                  key={bank.bankId}
                  value={bank.bankId}
                  className="min-h-[3rem] py-1"
                >
                  <div className="w-full flex items-center justify-start gap-2">
                    <Image
                      src={bank.iconUrl}
                      alt={`${bank.name} bank`}
                      width={28}
                      height={28}
                    />

                    <Text className="text-xl font-bold dark:text-gray-50 uppercase">
                      {bank.name}
                    </Text>
                  </div>
                </SelectInput.Item>
              ))}
            </SelectInput.Group>
          </SelectInput.Content>
        </SelectInput.Root>
      </label>

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
