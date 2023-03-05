import { PaperPlaneTilt, Wallet } from 'phosphor-react'

import { Button } from '@components/Button'
import { Text } from '@components/Text'
import { Avatar } from '@components/Avatar'
import { Skeleton } from '@components/FetchingStates/Skeleton'
import { DialogModal } from '@components/Dialogs/DialogModal'
import { SendSuccess } from '@components/pages/Send/SendSuccess'
import { WalletInfos } from '@components/pages/Layouts/WalletInfos'

import { CoinProps, HandleSendTransactionProps } from '@hooks/send/interfaces'
import { useCoinFeeData } from '@hooks/global/coins/queries/useCoinFeeData'
import { useSend } from '@hooks/send/useSend'

interface SendModalProps {
  usdAmount: number
  coinAmount: number
  to: string
  coin: CoinProps
  isSendingTx: boolean
  txData?: { transactionHash: string }
  handleSendTransaction: (_tx: HandleSendTransactionProps) => void
}

export function SendModal({
  coinAmount,
  usdAmount,
  to,
  coin,
  txData,
  isSendingTx,
  handleSendTransaction
}: SendModalProps) {
  const { t, customer } = useSend()

  const { data: coinFeeData, isLoading: coinFeeIsLoading } = useCoinFeeData(
    coin.rpcUrl,
    coin.symbol,
    coin.decimals,
    customer?.wallets.solana.address
  )
  const destinationWalletFormatted =
    coin.symbol === 'sol'
      ? `${to.slice(0, 4)}...${to.slice(-4)}`
      : `${to.slice(0, 6)}...${to.slice(-4)}`

  return (
    <DialogModal.Content
      className="md:max-w-[32rem]"
      onEscapeKeyDown={e => isSendingTx && e.preventDefault()}
      onInteractOutside={e => e.preventDefault()}
    >
      <div className="w-full h-full flex flex-col justify-center py-8 px-1 sm:py-4 sm:px-8">
        {!txData ? (
          <>
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
              <WalletInfos
                title={t.send.from}
                Icon={PaperPlaneTilt}
                className="p-3"
                variant="highlighted"
              >
                <Text
                  asChild
                  className="text-gray-700 dark:text-gray-50 capitalize"
                >
                  <strong>{customer?.name}</strong>
                </Text>

                <Text
                  asChild
                  className="text-sm text-gray-600 dark:text-gray-300 lowercase"
                >
                  <span>{`${
                    coin.symbol === 'sol'
                      ? `${customer?.wallets.solana.address.slice(
                          0,
                          4
                        )}...${customer?.wallets.solana.address.slice(-4)}`
                      : `${customer?.wallets.evm.address.slice(
                          0,
                          6
                        )}...${customer?.wallets.evm.address.slice(-4)}`
                  }`}</span>
                </Text>
              </WalletInfos>

              <WalletInfos
                title={t.send.to}
                Icon={Wallet}
                className="p-3"
                variant="highlighted"
              >
                <Text
                  asChild
                  className="text-gray-700 dark:text-gray-50 capitalize"
                >
                  <strong>{t.send.address}</strong>
                </Text>

                <Text
                  asChild
                  className="text-sm text-gray-600 dark:text-gray-300 lowercase"
                >
                  <span>{destinationWalletFormatted}</span>
                </Text>
              </WalletInfos>

              <div className="flex items-center text-gray-800 dark:text-gray-200 mb-8">
                <Skeleton isLoading={coinFeeIsLoading} className="h-7">
                  <Text className="mr-2">{t.send.fee}:</Text>

                  <Avatar.Root fallbackName="MA" className="w-5 h-5 mr-2">
                    <Avatar.Image
                      src={coin?.avatar}
                      alt={`${coin?.symbol} icon`}
                    />
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

            <div className="flex gap-2 md:flex-col-reverse">
              <DialogModal.Trigger>
                <Button className="bg-gray-200 text-gray-900 hover:bg-gray-300 m-0">
                  {t.send.cancel}
                </Button>
              </DialogModal.Trigger>

              <Button
                onClick={() =>
                  handleSendTransaction({
                    ...coin,
                    to,
                    amount: coinAmount
                  })
                }
                isLoading={isSendingTx}
              >
                {t.send.send}
              </Button>
            </div>
          </>
        ) : (
          <SendSuccess
            transactionUrl={
              coin.symbol === 'sol'
                ? `${coin.explorerUrl.replace('?cluster=testnet', '')}tx/${
                    txData.transactionHash
                  }${
                    process.env.NODE_ENV === 'development'
                      ? '?cluster=testnet'
                      : ''
                  }`
                : `${coin.explorerUrl}tx/${txData.transactionHash}`
            }
            amountInUsd={usdAmount}
            to={to}
            formattedToWallet={destinationWalletFormatted}
            amountIncoin={coinAmount}
            coinAvatar={coin.avatar}
            coinName={coin.symbol}
          />
        )}
      </div>

      {!isSendingTx && <DialogModal.IconClose />}
    </DialogModal.Content>
  )
}
