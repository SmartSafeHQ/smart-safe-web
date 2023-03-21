import { PaperPlaneTilt, Wallet } from 'phosphor-react'

import { Button } from '@components/Button'
import { Text } from '@components/Text'
import { Avatar } from '@components/Avatar'
import { Skeleton } from '@components/FetchingStates/Skeleton'
import { DialogModal } from '@components/Dialogs/DialogModal'
import { SendSuccess } from '@components/pages/Send/SendSuccess'
import { WalletInfos } from '@components/pages/Layouts/WalletInfos'

import { useCoinFeeData } from '@hooks/global/coins/queries/useCoinFeeData'
import { useCustomSendHook } from '@hooks/send/useSend'
import { useSend } from '@contexts/SendContext'

export function SendModal() {
  const { t, customer } = useCustomSendHook()
  const {
    selectedCoin: coin,
    transaction,
    txData,
    isSendingTx,
    handleSendTransaction
  } = useSend()

  const { data: coinFeeData, isLoading: coinFeeIsLoading } = useCoinFeeData(
    coin.rpcUrl,
    coin.symbol,
    coin.decimals,
    customer?.wallets.solana.address
  )

  if (!transaction) return <></>

  return (
    <DialogModal.Content
      className="md:max-w-[32rem]"
      onEscapeKeyDown={e => isSendingTx && e.preventDefault()}
      onInteractOutside={e => isSendingTx && e.preventDefault()}
    >
      <div className="w-full h-full flex flex-col justify-center py-8 px-1 sm:py-3 sm:px-8">
        {!txData ? (
          <>
            <header className="w-full flex items-center flex-col gap-3 mb-6">
              <DialogModal.Title className="text-3xl font-bold text-gray-800 dark:text-gray-50">
                {t.send.send} ${transaction.usdAmount}
              </DialogModal.Title>

              <div className="w-full flex items-center justify-center gap-2">
                <DialogModal.Description className="text-center text-gray-700 dark:text-gray-300 text-xl font-semibold uppercase">
                  {transaction.formattedCoinAmount} {coin.symbol}
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
                  <span>
                    {coin.symbol === 'sol'
                      ? `${customer?.wallets.solana.formattedAddress}`
                      : `${customer?.wallets.evm.formattedAddress}`}
                  </span>
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
                  <span>{transaction.formattedTo}</span>
                </Text>
              </WalletInfos>

              <div className="flex items-center text-gray-800 dark:text-gray-200 mb-8">
                <Skeleton isLoading={coinFeeIsLoading} className="w-full h-7">
                  <Text className="mr-2">{t.send.fee}:</Text>

                  <Avatar.Root fallbackName="MA" className="w-5 h-5 mr-2">
                    <Avatar.Image
                      src={coin?.avatar}
                      alt={`${coin?.symbol} icon`}
                    />
                  </Avatar.Root>

                  {coinFeeData && (
                    <Text className="font-semibold">
                      {coinFeeData.valueInCoin.slice(0, 5)} ($
                      {coinFeeData.feeInUSD.slice(0, 4)})
                    </Text>
                  )}
                </Skeleton>
              </div>
            </div>

            <div className="flex gap-2 md:flex-col-reverse">
              <Button
                onClick={() =>
                  handleSendTransaction({
                    ...coin,
                    to: transaction.to,
                    amount: transaction.coinAmount
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
            transactionUrl={`${coin.explorerUrl}/tx/${txData.transactionHash}`}
          />
        )}
      </div>

      {!isSendingTx && <DialogModal.IconClose />}
    </DialogModal.Content>
  )
}
