import { utils } from 'ethers'

import { BackLink } from '@components/pages/BuyAndSell/BackLink'

import { Button } from '@/components/Button'
import { Heading } from '@/components/Heading'
import { TextInput } from '@/components/Inputs/TextInput'

import { useI18n } from '@hooks/useI18n'
import { useAuth } from '@contexts/AuthContext'
import { useSellStableCoin } from '@contexts/SellStableCoinContext'
import { useBurnStableCoin } from '@hooks/buyAndSell/mutations/useSellStableCoin'

import { BANKS } from './BankAccountData'

import type { Dispatch, SetStateAction } from 'react'
import type { Screens } from '@/pages/dashboard/buy-and-sell/sell'

type Props = {
  setCurrentScreen: Dispatch<SetStateAction<Screens>>
}

export function BankAccountDataConfirmation({ setCurrentScreen }: Props) {
  const { t } = useI18n()
  const { customer } = useAuth()
  const { selectedStableCoin, bankAccount, withdrawAmount } =
    useSellStableCoin()
  const { mutateAsync: burnStableCoin } = useBurnStableCoin()

  async function handlePageChange() {
    const amountToWithdrawInWei = utils
      .parseEther(String(withdrawAmount))
      .toString()

    await burnStableCoin({
      userAddress: customer?.wallets.evm.address || '',
      amount: amountToWithdrawInWei,
      contractAddress: selectedStableCoin.contractAddress
    })

    setCurrentScreen('withdraw')
  }

  return (
    <div>
      <BackLink href="/dashboard/buy-and-sell" />

      <div className="flex flex-col gap-2">
        <div className="mb-4">
          <Heading className="text-3xl">
            {t.sell.headings.bankAccountDataConfirmation}
          </Heading>
        </div>

        <TextInput.Root htmlFor="bankId">
          <TextInput.Label>{t.sell.inputs.bank.label}</TextInput.Label>

          <TextInput.Content>
            <TextInput.Input
              readOnly
              disabled
              value={
                BANKS.find(({ bankId }) => bankId === bankAccount?.bankId)?.name
              }
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
              value={bankAccount?.cpf}
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
              value={bankAccount?.name}
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
              value={bankAccount?.branch}
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
                value={bankAccount?.accountNumber}
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
                value={bankAccount?.lastDigit}
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
