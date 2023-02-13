import { PaperPlaneTilt, Wallet } from 'phosphor-react'

import { Button } from '@components/Button'
import { Text } from '@components/Text'
import { Avatar } from '@components/Avatar'
import { Skeleton } from '@components/FetchingStates/Skeleton'
import { DialogModal } from '@components/Dialogs/DialogModal'

import { useSendTransaction } from '@hooks/send/useSendTransaction'
import { CoinProps } from '@hooks/send/interfaces'

interface SendModalProps {
  usdAmount: number
  coinAmount: number
  to: string
  coin: CoinProps
}

export function SendModal({ coinAmount, usdAmount, to, coin }: SendModalProps) {
  const {
    t,
    isSendingTx,
    customer,
    coinFeeData,
    coinFeeIsLoading,
    handleSendTransaction
  } = useSendTransaction({ coin })

  return (
    <DialogModal.Content className="md:max-w-[32rem] min-h-[62vh]">
      <div className="w-full flex flex-col justify-center py-8 px-1 sm:py-4 sm:px-8">
        <header className="w-full flex items-center flex-col gap-3 mb-6">
          <DialogModal.Title className="text-3xl font-bold text-gray-800 dark:text-gray-50">
            {t.send.send} ${usdAmount.toFixed(2)}
          </DialogModal.Title>

          <div className="w-full flex items-center justify-center gap-2">
            <DialogModal.Description className="text-center text-gray-700 dark:text-gray-300 text-xl font-semibold uppercase">
              {coinAmount.toFixed(4)} {coin.symbol}
            </DialogModal.Description>

            <Avatar.Root fallbackName={coin.symbol} className="w-6 h-6">
              <Avatar.Image src={coin.avatar} alt={`${coin.symbol} icon`} />
            </Avatar.Root>
          </div>
        </header>

        <div className="w-full flex flex-col gap-4">
          <div className="w-full flex gap-4 items-center justify-between p-3 rounded-md bg-gray-50 dark:bg-gray-700 shadow-md sm:p-3">
            <div className="flex items-center gap-3">
              <PaperPlaneTilt className="w-7 h-7 text-cyan-500" />

              <Text className="text-base font-semibold capitalize text-gray-700 dark:text-gray-300 sm:text-lg">
                {t.send.from}
              </Text>
            </div>

            <div className="flex flex-wrap flex-col gap-1 text-right">
              <Text
                asChild
                className="text-gray-700 dark:text-gray-50 capitalize"
              >
                <strong>{customer?.email.slice(0, 6)}</strong>
              </Text>

              <Text
                asChild
                className="text-sm text-gray-600 dark:text-gray-300"
              >
                <span>{`${customer?.wallet.address?.slice(
                  0,
                  6
                )}...${customer?.wallet.address?.slice(-6)}`}</span>
              </Text>
            </div>
          </div>

          <div className="w-full flex gap-4 items-center justify-between p-3 rounded-md bg-gray-50 dark:bg-gray-700 shadow-md sm:p-3">
            <div className="flex items-center gap-3">
              <Wallet className="w-7 h-7 text-cyan-500" />

              <Text className="text-base font-semibold capitalize text-gray-700 dark:text-gray-300 sm:text-lg">
                {t.send.to}
              </Text>
            </div>

            <div className="flex flex-wrap flex-col gap-1 text-right">
              <Text
                asChild
                className="text-gray-700 dark:text-gray-50 capitalize"
              >
                <strong>{t.send.address}</strong>
              </Text>

              <Text
                asChild
                className="text-sm text-gray-600 dark:text-gray-300"
              >
                <span>{`${to.slice(0, 6)}...${to.slice(-6)}`}</span>
              </Text>
            </div>
          </div>

          <div className="flex items-center text-gray-800 dark:text-gray-200">
            <Skeleton isLoading={coinFeeIsLoading} className="h-7">
              <Text className="mr-2">{t.send.fee}:</Text>

              <Avatar.Root fallbackName="MA" className="w-5 h-5 mr-2">
                <Avatar.Image src={coin?.avatar} alt={`${coin?.symbol} icon`} />
              </Avatar.Root>

              {coinFeeData && (
                <Text className="font-semibold">
                  {coinFeeData.valueInCoin.slice(0, 6)} ($
                  {coinFeeData.feeInUSD.slice(0, 4)})
                </Text>
              )}
            </Skeleton>
          </div>
        </div>

        <Button
          onClick={() =>
            handleSendTransaction({
              ...coin,
              to,
              amount: coinAmount
            })
          }
          isLoading={isSendingTx}
          className="mt-6"
        >
          {t.send.send}
        </Button>
      </div>

      {!isSendingTx && <DialogModal.IconClose />}
    </DialogModal.Content>
  )
}
