import clsx from 'clsx'
import Image from 'next/image'

import { Button } from '@components/Button'
import { Heading } from '@components/Heading'
import { Text } from '@components/Text'
import { ErrorState } from '@components/FetchingStates/ErrorState'
import { Skeleton } from '@components/FetchingStates/Skeleton'
import { DataConfirmationItem } from '@components/pages/BuyAndSell/Sell/DataConfirmationItem'

import { useSellCoinDataConfirm } from '@hooks/buyAndSell/sell/useSellCoinDataConfirm'

export function SellDataConfirmationSection() {
  const {
    t,
    withdrawAmount,
    selectedStableCoin,
    bankAccount,
    isLoading,
    currencyData,
    currencyIsLoading,
    currencyIsFetching,
    isPreviousData,
    handleSell,
    selectedBank
  } = useSellCoinDataConfirm()

  if (!bankAccount || !selectedBank || withdrawAmount <= 0)
    return (
      <ErrorState
        title={t.sellStableCoin.invalidDataError}
        className="flex-1 p-12"
      />
    )

  return (
    <section className="w-full max-w-lg flex flex-1 flex-col gap-4 items-stretch">
      <div
        className={clsx(
          'w-full flex items-center gap-2 pb-3 font-medium border-b-1 border-gray-400 dark:border-gray-600',
          {
            'animate-pulse': currencyIsFetching
          }
        )}
      >
        <div className="flex flex-col gap-2">
          <Text>
            {t.sellStableCoin.youWillWithdraw} ({selectedStableCoin.symbol})
          </Text>

          <Skeleton
            className="w-full h-6"
            isLoading={currencyIsLoading || isPreviousData}
          >
            {currencyData && (
              <Text>
                {Intl.NumberFormat('pt-BR', {
                  currency: 'BRL',
                  style: 'currency'
                }).format(withdrawAmount * (currencyData.value ?? 0))}
              </Text>
            )}
          </Skeleton>
        </div>
      </div>

      <ul className="w-full flex flex-col gap-5 items-stretch">
        <li className="w-full flex flex-col gap-2">
          <Heading className="text-xl font-semibold" asChild>
            <h4>{t.sellStableCoin.inputs.bank.label}</h4>
          </Heading>

          <div className="w-full flex items-center  justify-start gap-3">
            <Image
              src={selectedBank.iconUrl}
              alt={`${selectedBank.name} bank`}
              className="w-6 h-6"
              width={24}
              height={24}
            />

            <Text className="text-xl text-gray-500 dark:text-gray-400 uppercase">
              {selectedBank.name}
            </Text>
          </div>
        </li>

        <DataConfirmationItem
          title={t.sellStableCoin.inputs.cpf.label}
          value={bankAccount.cpf}
        />

        <DataConfirmationItem
          title={t.sellStableCoin.inputs.name.label}
          value={bankAccount.name}
        />

        <DataConfirmationItem
          title={t.sellStableCoin.inputs.branch.label}
          value={bankAccount.branch}
        />

        <div className="flex gap-2 items-center">
          <DataConfirmationItem
            title={t.sellStableCoin.inputs.accountNumber.label}
            value={bankAccount.accountNumber}
          />

          <DataConfirmationItem
            title={t.sellStableCoin.inputs.lastDigit.label}
            value={bankAccount.lastDigit}
          />
        </div>
      </ul>

      <Button onClick={handleSell} isLoading={isLoading}>
        {t.sellStableCoin.checkout}
      </Button>
    </section>
  )
}
