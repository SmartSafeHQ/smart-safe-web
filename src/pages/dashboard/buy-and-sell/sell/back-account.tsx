import { ReactElement } from 'react'
import { z } from 'zod'
import Head from 'next/head'
import Image from 'next/image'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

import { Text } from '@components/Text'
import { BackLink } from '@components/pages/BuyAndSell/BackLink'
import { Button } from '@components/Button'
import { Heading } from '@components/Heading'
import { TextInput } from '@components/Inputs/TextInput'
import { SelectInput } from '@components/Inputs/SelectInput'

import {
  SellStableCoinContextProvider,
  useSellStableCoin
} from '@contexts/SellStableCoinContext'
import { useI18n } from '@hooks/useI18n'

export const validationSchema = z.object({
  amount: z
    .number({ invalid_type_error: 'min 0.1' })
    .min(0.1, { message: 'min 0.1' }),
  bankId: z.string().min(1, { message: 'bank required' }),
  cpf: z.string().min(1, { message: 'cpf required' }),
  name: z.string().min(1, { message: 'name required' }),
  branch: z.string().min(1, { message: 'branch required' }),
  accountNumber: z.string().min(1, { message: 'account number required' }),
  lastDigit: z.string().min(1, { message: 'last digit required' })
})

export type SellBankAccountFieldValues = z.infer<typeof validationSchema>

export const BANKS = [
  { bankId: '260', name: 'NuBank', iconUrl: '/banks/nubank.png' },
  { bankId: '341', name: 'Itaú Unibanco', iconUrl: '/banks/itau.png' },
  { bankId: '33', name: 'Santander', iconUrl: '/banks/santander.png' }
]

const BankAccountSell = () => {
  const { push } = useRouter()
  const { t } = useI18n()
  const { setBankAccount } = useSellStableCoin()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SellBankAccountFieldValues>({
    resolver: zodResolver(validationSchema)
  })

  const onSubmit: SubmitHandler<SellBankAccountFieldValues> = async data => {
    try {
      setBankAccount(data)

      push('/dashboard/buy-and-sell/sell/back-account')
    } catch (error) {
      toast.error(`Error. ${(error as Error).message}`)
    }
  }

  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center px-4 pt-8 gap-8 bg-gray-50 dark:bg-gray-900 md:px-8">
      <Head>
        <title>{t.buyAndSell.sell.headTitle}</title>
        <meta name="description" content={t.buyAndSell.sell.headDescription} />
      </Head>

      <div className="w-full flex justify-start items-stretch">
        <BackLink href="/dashboard/sell" />
      </div>

      <div className="w-full max-w-lg flex flex-1 flex-col gap-10">
        <Heading className="text-3xl">
          {t.sell.headings.bankAccountData}
        </Heading>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-lg flex flex-1 flex-col gap-2 items-stretch"
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
              <TextInput.Label>
                {t.sell.inputs.accountNumber.label}
              </TextInput.Label>

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

            <TextInput.Root
              htmlFor="lastDigit"
              error={errors.lastDigit?.message}
            >
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

          <Button type="submit">{t.sell.bankDataConfirmation}</Button>
        </form>
      </div>
    </div>
  )
}

BankAccountSell.getLayout = function getLayout(page: ReactElement) {
  return <SellStableCoinContextProvider>{page}</SellStableCoinContextProvider>
}

export default BankAccountSell
