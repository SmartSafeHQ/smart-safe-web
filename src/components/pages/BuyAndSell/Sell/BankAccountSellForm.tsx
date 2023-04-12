import Image from 'next/image'

import { Button } from '@components/Button'
import { Text } from '@components/Text'
import { TextInput } from '@components/Inputs/TextInput'
import { SelectInput } from '@components/Inputs/SelectInput'

import {
  BANKS,
  useBankAccountSell
} from '@hooks/buyAndSell/sell/useBankAccountSell'

export function BankAccountSellForm() {
  const { t, register, handleSubmit, isSubmitting, errors, onSubmit } =
    useBankAccountSell()

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-lg flex flex-col gap-4 items-stretch"
    >
      <SelectInput.Root
        {...register('bankId')}
        className="w-full"
        defaultValue="33"
        labelText={t.sell.inputs.bank.label}
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
                <div className="w-full flex items-center justify-start gap-3">
                  <Image
                    src={bank.iconUrl}
                    alt={`${bank.name} bank`}
                    className="w-6 h-6"
                    width={24}
                    height={24}
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

      <TextInput.Root htmlFor="cpf" error={errors.cpf?.message}>
        <TextInput.Label>{t.sell.inputs.cpf.label}</TextInput.Label>

        <TextInput.Content>
          <TextInput.Input
            {...register('cpf')}
            required
            id="cpf"
            placeholder={t.sell.inputs.cpf.placeholder}
          />
        </TextInput.Content>
      </TextInput.Root>

      <TextInput.Root htmlFor="name" error={errors.name?.message}>
        <TextInput.Label>{t.sell.inputs.name.label}</TextInput.Label>

        <TextInput.Content>
          <TextInput.Input
            {...register('name')}
            required
            id="name"
            placeholder={t.sell.inputs.name.placeholder}
          />
        </TextInput.Content>
      </TextInput.Root>

      <TextInput.Root htmlFor="branch" error={errors.branch?.message}>
        <TextInput.Label>{t.sell.inputs.branch.label}</TextInput.Label>

        <TextInput.Content>
          <TextInput.Input
            {...register('branch')}
            required
            id="branch"
            placeholder={t.sell.inputs.branch.placeholder}
          />
        </TextInput.Content>
      </TextInput.Root>

      <div className="flex gap-3 mb-2">
        <TextInput.Root
          htmlFor="accountNumber"
          error={errors.accountNumber?.message}
        >
          <TextInput.Label>{t.sell.inputs.accountNumber.label}</TextInput.Label>

          <TextInput.Content>
            <TextInput.Input
              {...register('accountNumber')}
              required
              id="accountNumber"
              type="number"
              placeholder={t.sell.inputs.accountNumber.placeholder}
            />
          </TextInput.Content>
        </TextInput.Root>

        <TextInput.Root htmlFor="lastDigit" error={errors.lastDigit?.message}>
          <TextInput.Label>{t.sell.inputs.lastDigit.label}</TextInput.Label>

          <TextInput.Content>
            <TextInput.Input
              {...register('lastDigit')}
              type="number"
              required
              id="lastDigit"
              placeholder={t.sell.inputs.lastDigit.placeholder}
            />
          </TextInput.Content>
        </TextInput.Root>
      </div>

      <Button type="submit" isLoading={isSubmitting} className="capitalize">
        {t.sell.continue}
      </Button>
    </form>
  )
}
