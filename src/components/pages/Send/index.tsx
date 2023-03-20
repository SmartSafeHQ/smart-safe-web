import clsx from 'clsx'
import { Wallet, ArrowsClockwise } from 'phosphor-react'

import { Button } from '@components/Button'
import { Text } from '@components/Text'
import { DialogModal } from '@components/Dialogs/DialogModal'
import { TextInput } from '@components/Inputs/TextInput'
import { SendModal } from '@components/pages/Send/SendModal'
import { SendSelectCoin } from '@components/pages/Send/SendSelectCoin'

import { useCustomSendHook } from '@hooks/send/useSend'

export function SendScreen() {
  const {
    t,
    coinsData,
    coinsIsLoading,
    handleChangeCoin,
    isSendOpen,
    setIsSendOpen,
    register,
    handleSubmit,
    errors,
    handleChangeAmountInput,
    handleToggleAmountInputType,
    onSubmit,
    amountInputType,
    amounInReverseCoin,
    coinInUsdIsFetching
  } = useCustomSendHook()

  return (
    <div className="w-full max-w-lg flex flex-1 flex-col gap-7">
      <SendSelectCoin
        coinsData={coinsData}
        coinsIsLoading={coinsIsLoading}
        handleChangeCoin={handleChangeCoin}
      />

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
              className="w-6 h-6 flex items-center justify-center text-brand-foregroundAccent1 rounded-md shadow-sm ring-gray-100 bg-gray-200 dark:bg-gray-800 focus:ring-2"
              aria-label="Toggle coin input"
              onClick={handleToggleAmountInputType}
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
              {amounInReverseCoin.toFixed(amountInputType.decimals)}{' '}
              {amountInputType?.reverseSymbol}
            </Text>
          </TextInput.Content>
        </TextInput.Root>

        <Button type="submit" className="mt-3">
          {t.send.send}
        </Button>
      </form>

      <DialogModal.Root open={isSendOpen} onOpenChange={setIsSendOpen}>
        <SendModal />
      </DialogModal.Root>
    </div>
  )
}
