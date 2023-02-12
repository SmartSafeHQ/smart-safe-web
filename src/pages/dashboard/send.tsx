import Head from 'next/head'
import { ArrowsClockwise, Wallet } from 'phosphor-react'

import { Button } from '@components/Button'
import { TextInput } from '@components/Inputs/TextInput'
import { Heading } from '@components/Heading'
import { Text } from '@components/Text'
import { Avatar } from '@components/Avatar'
import { DialogModal } from '@components/Dialogs/DialogModal'
import { SendModal } from '@components/pages/Send/SendModal'
import { SelectInput } from '@components/Inputs/SelectInput'

import { useSend } from '@hooks/send/useSend'
import { useI18n } from '@hooks/useI18n'
import { formatCurrencyToNumber } from '@utils/global'

const Send = () => {
  const {
    register,
    handleSubmit,
    setValue,
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
    currentMaticFee,
    currentDollarFee
  } = useSend()
  const { t } = useI18n()

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

            <SelectInput.Root className="w-full">
              <SelectInput.Group>
                <SelectInput.Item value="temp" className="py-1">
                  <div className="w-full flex items-center justify-start gap-1">
                    <Avatar.Root fallbackName="MA" className="w-7 h-7">
                      <Avatar.Image
                        src="https://token.metaswap.codefi.network/assets/nativeCurrencyLogos/matic.svg"
                        alt="matic"
                      />
                    </Avatar.Root>

                    <Text className="text-xl font-bold dark:text-gray-50 uppercase">
                      matic
                    </Text>
                  </div>
                </SelectInput.Item>
              </SelectInput.Group>
            </SelectInput.Root>
          </div>

          <div className="w-full flex items-center justify-center gap-3">
            <Avatar.Root fallbackName={selectedCoin.id} className="w-24 h-24">
              <Avatar.Image
                src="https://token.metaswap.codefi.network/assets/nativeCurrencyLogos/matic.svg"
                alt="matic coin"
              />
            </Avatar.Root>

            <div className="flex flex-col justify-center items-start">
              <Heading className="text-3xl uppercase">matic</Heading>

              <div className="flex items-center gap-1">
                <Text className="capitalize">{t.send.balance}:</Text>
                <Text className="font-semibold">0.1969</Text>
              </div>
            </div>
          </div>

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
                  onClick={e => e.preventDefault()}
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
                  defaultValue="$0.0 USD"
                  placeholder={t.send.amountPlaceholder}
                  onChange={e => {
                    const floatAmount = formatCurrencyToNumber(e.target.value)

                    const formattedAmount = new Intl.NumberFormat('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    }).format(floatAmount)

                    setValue('amount', `$${formattedAmount} USD`)
                  }}
                  className="text-2xl font-semibold"
                />

                <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 uppercase">
                  0.75 MATIC
                </Text>
              </TextInput.Content>
            </TextInput.Root>

            <Button type="submit" className="mt-3">
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
