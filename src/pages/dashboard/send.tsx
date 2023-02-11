import Head from 'next/head'
import { CurrencyDollar, Wallet } from 'phosphor-react'

import { Button } from '@components/Button'
import { TextInput } from '@components/Inputs/TextInput'
import { Heading } from '@components/Heading'
import { Text } from '@components/Text'
import { Avatar } from '@components/Avatar'
import { Skeleton } from '@components/FetchingStates/Skeleton'
import { DialogModal } from '@components/Dialogs/DialogModal'
import { SendModal } from '@components/pages/Send/SendModal'

import { useSend } from '@hooks/send/useSend'
import { useI18n } from '@hooks/useI18n'

const Send = () => {
  const {
    register,
    handleSubmit,
    errors,
    isSendingTx,
    onSubmit,
    transactionUrl,
    setTransactionUrl,
    handleSendTransaction,
    transactionData,
    isSendModalOpen,
    setIsSendModalOpen,
    selectedCoin,
    currentAmount,
    currentMaticAmount,
    currentMaticFee,
    currentDollarFee
  } = useSend()
  const { t } = useI18n()

  return (
    <div className="w-full flex flex-col items-center justify-center px-2 pt-24">
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
        <div className="w-full max-w-lg flex flex-1 flex-col">
          <div className="w-full flex items-center flex-col gap-4 mb-8">
            <Heading
              asChild
              className="text-3xl font-semibold text-gray-800 dark:text-gray-50 md:text-4xl"
            >
              <h1>
                {t.send.send} ${currentAmount}
              </h1>
            </Heading>

            <div className="w-full flex items-center justify-center gap-2">
              <Skeleton
                isLoading={!currentMaticAmount && currentMaticAmount !== 0}
                className="h-8"
              >
                <Text className="text-gray-700 dark:text-gray-300 text-xl font-semibold uppercase">
                  {currentMaticAmount?.toFixed(4)} {selectedCoin.id}
                </Text>
              </Skeleton>

              <Avatar.Root fallbackName={selectedCoin.id} className="w-6 h-6">
                <Avatar.Image
                  src={selectedCoin.avatar}
                  alt={`${selectedCoin.name} icon`}
                />
              </Avatar.Root>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-4 items-stretch"
          >
            <TextInput.Root
              htmlFor="destination-wallet"
              labelText={t.send.to}
              error={errors.sendWallet?.message}
            >
              <TextInput.Icon>
                <Wallet />
              </TextInput.Icon>

              <TextInput.Input
                {...register('sendWallet')}
                required
                id="destination-wallet"
                placeholder={t.send.toPlaceholder}
              />
            </TextInput.Root>

            <TextInput.Root
              htmlFor="amount"
              labelText={t.send.amount}
              error={errors.amount?.message}
            >
              <TextInput.Icon>
                <CurrencyDollar />
              </TextInput.Icon>

              <TextInput.Input
                {...register('amount', { valueAsNumber: true })}
                type="number"
                required
                id="amount"
                min={0}
                step={0.0001}
                defaultValue={0}
                placeholder={t.send.amountPlaceholder}
              />
            </TextInput.Root>

            <div className="flex items-center text-gray-800 dark:text-gray-200">
              <Text className="mr-2">{t.send.fee}:</Text>

              <Avatar.Root fallbackName="MA" className="w-5 h-5 mr-2">
                <Avatar.Image
                  src={selectedCoin.avatar}
                  alt={`${selectedCoin.name} icon`}
                />
              </Avatar.Root>

              <Skeleton
                isLoading={!currentMaticFee && currentMaticFee !== 0}
                className="h-6"
              >
                <Text className="font-semibold">
                  {currentMaticFee?.toFixed(2)} (${currentDollarFee.toFixed(2)})
                </Text>
              </Skeleton>
            </div>

            <Button type="submit" className="mt-1">
              {t.send.send}
            </Button>
          </form>

          <SendModal
            transaction={transactionData}
            transactionUrl={transactionUrl}
            coin={selectedCoin}
            coinFee={currentMaticFee}
            dollarFee={currentDollarFee}
            isSending={isSendingTx}
            handleSendTransaction={handleSendTransaction}
          />
        </div>
      </DialogModal.Root>
    </div>
  )
}

export default Send
