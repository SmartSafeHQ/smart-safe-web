import Head from 'next/head'
import { ReactElement } from 'react'
import { utils } from 'ethers'

import { Button } from '@components/Button'
import { Heading } from '@components/Heading'
import { BackLink } from '@components/pages/BuyAndSell/BackLink'
import { TextInput } from '@components/Inputs/TextInput'

import { BANKS } from '@/pages/dashboard/buy-and-sell/sell/back-account'
import { useSelectSellCoin } from '@hooks/buyAndSell/sell/useSelectSellCoin'
import {
  SellStableCoinContextProvider,
  useSellStableCoin
} from '@contexts/SellStableCoinContext'
import { useBurnStableCoin } from '@hooks/buyAndSell/mutations/useSellStableCoin'

const SellDataConfirmation = () => {
  const { withdrawAmount, bankAccount } = useSellStableCoin()
  const { t, customer, selectedStableCoin } = useSelectSellCoin()
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
  }

  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center px-4 pt-8 gap-8 bg-gray-50 dark:bg-gray-900 md:px-8">
      <Head>
        <title>{t.buyAndSell.sell.headTitle}</title>
        <meta name="description" content={t.buyAndSell.sell.headDescription} />
      </Head>

      <div className="w-full flex justify-start items-stretch">
        <BackLink href="/dashboard/sell/bank-account" />
      </div>

      <div className="w-full max-w-lg flex flex-1 flex-col gap-10">
        <Heading className="text-3xl">
          {t.sell.headings.bankAccountDataConfirmation}
        </Heading>

        <section className="w-full max-w-lg flex flex-1 flex-col gap-2 items-stretch">
          <TextInput.Root htmlFor="bankId">
            <TextInput.Label>{t.sell.inputs.bank.label}</TextInput.Label>

            <TextInput.Content>
              <TextInput.Input
                readOnly
                disabled
                value={
                  BANKS.find(({ bankId }) => bankId === bankAccount?.bankId)
                    ?.name
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
        </section>
      </div>
    </div>
  )
}

SellDataConfirmation.getLayout = function getLayout(page: ReactElement) {
  return <SellStableCoinContextProvider>{page}</SellStableCoinContextProvider>
}

export default SellDataConfirmation
