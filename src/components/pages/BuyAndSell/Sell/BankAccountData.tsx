import Image from 'next/image'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Text } from '@components/Text'
import { BackLink } from '../BackLink'
import { Button } from '@components/Button'
import { Heading } from '@components/Heading'
import { TextInput } from '@components/Inputs/TextInput'
import { SelectInput } from '@components/Inputs/SelectInput'

import {
  SellBankAccountFieldValues,
  bvalidationSchema
} from '@hooks/buyAndSell/sell/useSelectSellCoin'
import { useI18n } from '@hooks/useI18n'

import type { Dispatch, SetStateAction } from 'react'
import type { Screens } from '@/pages/dashboard/buy-and-sell/sell'

interface BankAccountDataProps {
  setCurrentScreen: Dispatch<SetStateAction<Screens>>
}

export const BANKS = [
  { bankId: '260', name: 'NuBank', iconUrl: '/banks/nubank.png' },
  { bankId: '341', name: 'Itaú Unibanco', iconUrl: '/banks/itau.png' },
  { bankId: '33', name: 'Santander', iconUrl: '/banks/santander.png' }
]

export function BankAccountData({ setCurrentScreen }: BankAccountDataProps) {
  const { t } = useI18n()

  const {
    register,
    formState: { errors }
  } = useForm<SellBankAccountFieldValues>({
    resolver: zodResolver(bvalidationSchema)
  })

  async function handlePageChange() {
    setCurrentScreen('bank-account-data-confirmation')
  }

  return (
    <div className="flex flex-col gap-2">
      <BackLink href="/dashboard/buy-and-sell" />

      <div className="mb-4">
        <Heading className="text-3xl">
          {t.sell.headings.bankAccountData}
        </Heading>
      </div>

      <label>
        <p className="font-bold">{t.sell.inputs.bank.label}</p>

        <SelectInput.Root
          {...register('bankId')}
          className="w-full"
          defaultValue="33"
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
