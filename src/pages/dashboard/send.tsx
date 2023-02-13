import Head from 'next/head'
import clsx from 'clsx'
import { ArrowsClockwise, Wallet } from 'phosphor-react'

import { Button } from '@components/Button'
import { TextInput } from '@components/Inputs/TextInput'
import { Heading } from '@components/Heading'
import { Text } from '@components/Text'
import { Avatar } from '@components/Avatar'
import { DialogModal } from '@components/Dialogs/DialogModal'
import { SendModal } from '@components/pages/Send/SendModal'
import { SelectInput } from '@components/Inputs/SelectInput'
import { Skeleton } from '@components/FetchingStates/Skeleton'

import { useSend } from '@hooks/send/useSend'

const Send = () => {
  const {
    t,
    coinsData,
    coinsIsLoading,
    coinInUsdIsFetching,
    setSelectedCoin,
    portfolioData,
    portfolioIsLoading,
    amountInUsd,
    amountInputType,
    register,
    handleSubmit,
    errors,
    isSendingTx,
    onSubmit,
    transactionUrl,
    setTransactionUrl,
    handleChangeAmountInput,
    handleToggleAmountInputType,
    handleSendTransaction,
    transactionData,
    isSendModalOpen,
    setIsSendModalOpen,
    selectedCoin,
    currentMaticFee,
    currentDollarFee
  } = useSend()

  return (
    <div className="w-full flex flex-col items-center justify-center px-2 pt-12">
      <Head>
        <title>{t.send.headTitle}</title>
        <meta name="description" content={t.send.headDescription} />
      </Head>

      <DialogModal.Root
        open={isSendModalOpen || isSendingTx}
        onOpenChange={() => {
          setIsSendModalOpen(!isSendModalOpen)
          setTransactionUrl(null)
        }}
      >
        <div className="w-full max-w-lg flex flex-1 flex-col gap-7">
          <div className="flex flex-col items-start gap-6">
            <Heading
              asChild
              className="text-gray-800 dark:text-gray-50 text-4xl"
            >
              <h1>Send using:</h1>
            </Heading>

            <Skeleton isLoading={coinsIsLoading} className="h-12">
              {coinsData && (
                <SelectInput.Root
                  className="w-full"
                  defaultValue="0"
                  onValueChange={coinIndex => {
                    const coin = coinsData[Number(coinIndex)]

                    setSelectedCoin(coin)
                  }}
                >
                  <SelectInput.Group>
                    {coinsData.map((coin, index) => (
                      <SelectInput.Item
                        key={coin.symbol}
                        value={String(index)}
                        className="py-1"
                      >
                        <div className="w-full flex items-center justify-start gap-2">
                          <Avatar.Root
                            fallbackName={coin.symbol}
                            className="w-7 h-7"
                          >
                            <Avatar.Image
                              src={coin.avatar}
                              alt={`${coin.symbol} coin`}
                            />
                          </Avatar.Root>

                          <Text className="text-xl font-bold dark:text-gray-50 uppercase">
                            {coin.symbol}
                          </Text>
                        </div>
                      </SelectInput.Item>
                    ))}
                  </SelectInput.Group>
                </SelectInput.Root>
              )}
            </Skeleton>
          </div>

          <Skeleton
            isLoading={coinsIsLoading}
            className="max-w-[13rem] h-24 mx-auto"
          >
            {selectedCoin && (
              <div className="w-full flex items-center justify-center gap-3">
                <Avatar.Root
                  fallbackName={selectedCoin.symbol}
                  className="w-24 h-24"
                >
                  <Avatar.Image
                    src={selectedCoin.avatar}
                    alt={`${selectedCoin.symbol} coin`}
                  />
                </Avatar.Root>

                <div className="flex flex-col justify-center items-start">
                  <Heading className="text-3xl uppercase">
                    {selectedCoin.symbol}
                  </Heading>

                  <Skeleton isLoading={portfolioIsLoading} className="w-28 h-6">
                    {portfolioData && (
                      <div className="flex items-center gap-1">
                        <Text className="capitalize">{t.send.balance}:</Text>
                        <Text className="font-semibold">
                          {portfolioData?.balance}
                        </Text>
                      </div>
                    )}
                  </Skeleton>
                </div>
              </div>
            )}
          </Skeleton>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-5 items-stretch"
          >
            <TextInput.Root
              htmlFor="destination-wallet"
              error={errors.sendWallet?.message}
            >
              <TextInput.Label>{t.send.to}</TextInput.Label>

              <TextInput.Content>
                <TextInput.Icon>
                  <Wallet />
                </TextInput.Icon>

                <TextInput.Input
                  {...register('sendWallet')}
                  required
                  id="destination-wallet"
                  placeholder={t.send.toPlaceholder}
                />
              </TextInput.Content>
            </TextInput.Root>

            <TextInput.Root htmlFor="amount" error={errors.amount?.message}>
              <div className="flex items-center gap-3">
                <TextInput.Label>{t.send.amount}</TextInput.Label>

                <button
                  className="w-6 h-6 flex items-center justify-center text-cyan-500 rounded-md shadow-md ring-gray-100 bg-gray-200 dark:bg-gray-800 focus:ring-2"
                  aria-label="Toggle coin input"
                  onClick={handleToggleAmountInputType}
                  formTarget="amount"
                >
                  <ArrowsClockwise className="w-4 h-w-4" />
                </button>
              </div>

              <TextInput.Content className="flex-col !items-start gap-1 py-2">
                <TextInput.Input
                  {...register('amount')}
                  required
                  id="amount"
                  defaultValue={amountInputType.defaultValue}
                  placeholder={t.send.amountPlaceholder}
                  onChange={handleChangeAmountInput}
                  className="text-2xl font-semibold uppercase"
                />

                <Text
                  className={clsx(
                    'text-sm font-medium text-gray-700 dark:text-gray-300 uppercase',
                    { 'animate-pulse': coinInUsdIsFetching }
                  )}
                >
                  {amountInUsd.toFixed(amountInputType.availableDecimals)}{' '}
                  {amountInputType?.reverseValueName}
                </Text>
              </TextInput.Content>
            </TextInput.Root>

            <Button type="submit" className="mt-3">
              {t.send.send}
            </Button>
          </form>

          {selectedCoin && (
            <SendModal
              transaction={transactionData}
              transactionUrl={transactionUrl}
              coin={selectedCoin}
              coinFee={currentMaticFee}
              dollarFee={currentDollarFee}
              isSending={isSendingTx}
              handleSendTransaction={handleSendTransaction}
            />
          )}
        </div>
      </DialogModal.Root>
    </div>
  )
}

export default Send
