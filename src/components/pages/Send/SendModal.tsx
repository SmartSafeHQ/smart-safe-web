import { ArrowSquareOut, PaperPlaneTilt, Wallet } from 'phosphor-react'

import { Button } from '@components/Button'
import { Text } from '@components/Text'
import { Avatar } from '@components/Avatar'
import { Skeleton } from '@components/FetchingStates/Skeleton'
import { DialogModal } from '@components/Dialogs/DialogModal'
import { CoinProps, TransactionProps } from '@/hooks/send/useSend'

interface SendModalProps {
  transaction: TransactionProps | null
  transactionUrl: string | null
  coin: CoinProps
  coinFee: number
  dollarFee: number
  isSending: boolean
  handleSendTransaction: () => void
}

export function SendModal({
  transaction,
  transactionUrl,
  coin,
  coinFee,
  dollarFee,
  handleSendTransaction,
  isSending
}: SendModalProps) {
  return (
    <DialogModal.Content className="md:max-w-[32rem] min-h-[65vh]">
      <div className="w-full flex flex-col justify-center py-8 px-1 sm:py-4 sm:px-8">
        <header className="w-full flex items-center flex-col gap-3 mb-6">
          <DialogModal.Title className="text-3xl font-bold text-gray-800 dark:text-gray-50">
            Send ${transaction?.usdAmount}
          </DialogModal.Title>

          <div className="w-full flex items-center justify-center gap-2">
            <Skeleton
              isLoading={
                !transaction?.coinAmount && transaction?.coinAmount !== 0
              }
              className="h-8"
            >
              <DialogModal.Description className="text-center text-gray-700 dark:text-gray-300 text-xl font-semibold uppercase">
                {transaction?.coinAmount?.toFixed(4)} {coin.id}
              </DialogModal.Description>
            </Skeleton>

            <Avatar.Root fallbackName={coin.id} className="w-6 h-6">
              <Avatar.Image src={coin.avatar} alt={`${coin.name} icon`} />
            </Avatar.Root>
          </div>
        </header>

        <div className="w-full flex flex-col gap-4">
          <div className="w-full flex gap-4 items-center justify-between p-3 rounded-md bg-gray-50 dark:bg-gray-700 shadow-md sm:p-3">
            <div className="flex items-center gap-3">
              <PaperPlaneTilt className="w-7 h-7 text-cyan-500" />

              <Text className="text-base font-semibold capitalize text-gray-700 dark:text-gray-300 sm:text-lg">
                From
              </Text>
            </div>

            <div className="flex flex-wrap flex-col gap-1 text-right">
              <Text
                asChild
                className="text-gray-700 dark:text-gray-50 capitalize"
              >
                <strong>{transaction?.fromName}</strong>
              </Text>

              <Text
                asChild
                className="text-sm text-gray-600 dark:text-gray-300"
              >
                <span>{`${transaction?.fromWalletAddress?.slice(
                  0,
                  6
                )}...${transaction?.fromWalletAddress?.slice(-6)}`}</span>
              </Text>
            </div>
          </div>

          <div className="w-full flex gap-4 items-center justify-between p-3 rounded-md bg-gray-50 dark:bg-gray-700 shadow-md sm:p-3">
            <div className="flex items-center gap-3">
              <Wallet className="w-7 h-7 text-cyan-500" />

              <Text className="text-base font-semibold capitalize text-gray-700 dark:text-gray-300 sm:text-lg">
                To
              </Text>
            </div>

            <div className="flex flex-wrap flex-col gap-1 text-right">
              <Text
                asChild
                className="text-gray-700 dark:text-gray-50 capitalize"
              >
                <strong>Address</strong>
              </Text>

              <Text
                asChild
                className="text-sm text-gray-600 dark:text-gray-300"
              >
                <span>{`${transaction?.to?.slice(
                  0,
                  6
                )}...${transaction?.to?.slice(-6)}`}</span>
              </Text>
            </div>
          </div>

          <div className="flex items-center text-gray-800 dark:text-gray-200">
            <Text className="mr-2">Fee:</Text>

            <Avatar.Root fallbackName="MA" className="w-5 h-5 mr-2">
              <Avatar.Image src={coin.avatar} alt={`${coin.name} icon`} />
            </Avatar.Root>

            <Skeleton isLoading={!coinFee && coinFee !== 0} className="h-6">
              <Text className="font-semibold">
                {coinFee?.toFixed(2)} (${dollarFee.toFixed(2)})
              </Text>
            </Skeleton>
          </div>
        </div>

        <Button
          onClick={handleSendTransaction}
          isLoading={isSending}
          className="mt-6"
        >
          Send
        </Button>

        {transactionUrl && (
          <Text className="mt-4 text-gray-800 dark:text-gray-200">
            See on:
            <a
              href={transactionUrl}
              target="_blank"
              className="ml-1 font-semibold text-cyan-500 hover:text-cyan-600"
              rel="noreferrer"
            >
              <Text>{transactionUrl?.slice(0, 30)}...</Text>

              <ArrowSquareOut
                className="w-4 h-4 ml-1 md:hidden lg:inline"
                weight="bold"
              />
            </a>
          </Text>
        )}
      </div>

      <DialogModal.IconClose />
    </DialogModal.Content>
  )
}
