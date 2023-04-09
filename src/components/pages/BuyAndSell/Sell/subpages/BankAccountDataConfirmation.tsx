import { Back } from '../components/Back'
import { Button } from '@/components/Button'
import { Heading } from '@/components/Heading'
import { TextInput } from '@/components/Inputs/TextInput'
import { AmountToWithdraw } from '../components/AmountToWithdraw'

import { useI18n } from '@/hooks/useI18n'
import { useAuth } from '@/contexts/AuthContext'
import { useSellContext } from '@/contexts/pages/SellContext'
import { useBurnStableCoin } from '@/hooks/buyAndSell/mutations/useSellStableCoin'

import { BANKS } from './BankAccountData'

import type { Dispatch, SetStateAction } from 'react'
import type { Screens } from '@/pages/dashboard/buy-and-sell/sell'
import { utils } from 'ethers'

type Props = {
  setCurrentScreen: Dispatch<SetStateAction<Screens>>
}

export function BankAccountDataConfirmation({ setCurrentScreen }: Props) {
  const { t } = useI18n()
  const { customer } = useAuth()
  const { getValues, trigger } = useSellContext()
  const { mutateAsync: burnStableCoin } = useBurnStableCoin()

  async function handlePageChange() {
    const areAllFieldValid = await trigger()

    if (!areAllFieldValid) {
      return
    }

    const amountToWithdrawInWei = utils
      .parseEther(getValues('amountToWithdraw'))
      .toString()

    await burnStableCoin({
      userAddress: customer?.wallets.evm.address || '',
      amount: amountToWithdrawInWei,
      contractAddress: getValues('selectedStableCoin.address')
    })

    setCurrentScreen('withdraw')
  }

  return (
    <div>
      <Back page="bank-account-data" setCurrentScreen={setCurrentScreen} />

      <div className="flex flex-col gap-2">
        <div className="mb-4">
          <Heading className="text-3xl">
            {t.sell.headings.bankAccountDataConfirmation}
          </Heading>
        </div>

        <AmountToWithdraw />

        <TextInput.Root htmlFor="bankId">
          <TextInput.Label>{t.sell.inputs.bank.label}</TextInput.Label>

          <TextInput.Content>
            <TextInput.Input
              readOnly
              disabled
              value={
                BANKS.find(({ bankId }) => bankId === getValues('bankId'))?.name
              }
              type="text"
              id="bankId"
            />
          </TextInput.Content>
        </TextInput.Root>

        <TextInput.Root htmlFor="cpf">
          <TextInput.Label>{t.sell.inputs.cpf.label}</TextInput.Label>

          <TextInput.Content>
            <TextInput.Input
              readOnly
              disabled
              value={getValues('cpf')}
              type="text"
              id="cpf"
            />
          </TextInput.Content>
        </TextInput.Root>

        <TextInput.Root htmlFor="name">
          <TextInput.Label>{t.sell.inputs.name.label}</TextInput.Label>

          <TextInput.Content>
            <TextInput.Input
              readOnly
              disabled
              value={getValues('name')}
              type="text"
              id="name"
            />
          </TextInput.Content>
        </TextInput.Root>

        <TextInput.Root htmlFor="branch">
          <TextInput.Label>{t.sell.inputs.branch.label}</TextInput.Label>

          <TextInput.Content>
            <TextInput.Input
              readOnly
              disabled
              value={getValues('branch')}
              type="text"
              id="branch"
            />
          </TextInput.Content>
        </TextInput.Root>

        <div className="flex gap-2">
          <TextInput.Root htmlFor="accountNumber">
            <TextInput.Label>
              {t.sell.inputs.accountNumber.label}
            </TextInput.Label>

            <TextInput.Content>
              <TextInput.Input
                readOnly
                disabled
                value={getValues('accountNumber')}
                type="text"
                id="accountNumber"
              />
            </TextInput.Content>
          </TextInput.Root>

          <TextInput.Root htmlFor="lastDigit">
            <TextInput.Label>{t.sell.inputs.lastDigit.label}</TextInput.Label>

            <TextInput.Content>
              <TextInput.Input
                readOnly
                disabled
                value={getValues('lastDigit')}
                type="text"
                id="lastDigit"
              />
            </TextInput.Content>
          </TextInput.Root>
        </div>

        <Button onClick={handlePageChange}>{t.sell.checkout}</Button>
      </div>
    </div>
  )
}
