import { Wallet, ArrowsClockwise } from '@phosphor-icons/react'
import { ReactElement } from 'react'
import Head from 'next/head'
import clsx from 'clsx'

import { SendSelectToken } from '@components/pages/Send/SendSelectToken'
import { TextInput } from '@components/Inputs/TextInput'
import { Text } from '@components/Text'
import { Button } from '@components/Button'

import { SendProvider } from '@contexts/SendContext'
import { useSendHook } from '@hooks/send/useSendHook'

const Send = () => {
  const {
    tokens,
    tokensIsLoading,
    handleChangeToken,
    register,
    handleSubmit,
    errors,
    handleChangeAmountInput,
    handleToggleAmountInputType,
    onSubmit,
    amountInputType,
    amounInReverseToken,
    tokenUsdIsFetching
  } = useSendHook()

  return (
    <div className="flex flex-col items-center justify-center">
      <Head>
        <title>SmartSafe | Send tokens</title>
        <meta
          name="description"
          content="SmartSafe decentralized send safe tokens"
        />
      </Head>

      <div className="w-full flex flex-1 flex-col items-center justify-center pt-9 px-3">
        <div className="w-full max-w-lg flex flex-col gap-7">
          <SendSelectToken
            tokens={tokens}
            tokensIsLoading={tokensIsLoading}
            handleChangeToken={handleChangeToken}
          />

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-5 items-stretch"
          >
            <TextInput.Root htmlFor="to" error={errors.to?.message}>
              <TextInput.Label>to</TextInput.Label>

              <TextInput.Content>
                <TextInput.Icon>
                  <Wallet />
                </TextInput.Icon>

                <TextInput.Input
                  {...register('to')}
                  required
                  id="to"
                  placeholder="Enter account address"
                />
              </TextInput.Content>
            </TextInput.Root>

            <TextInput.Root htmlFor="amount" error={errors.amount?.message}>
              <div className="flex items-center gap-3">
                <TextInput.Label>Amount</TextInput.Label>

                <button
                  type="button"
                  onClick={handleToggleAmountInputType}
                  className="w-6 h-6 flex items-center justify-center text-cyan-500 rounded-md shadow-sm ring-zinc-100 bg-zinc-200 dark:bg-zinc-800 focus:ring-2"
                  aria-label="Toggle token input"
                >
                  <ArrowsClockwise className="w-4 h-w-4" />
                </button>
              </div>

              <TextInput.Content className="flex-col !items-start gap-2 py-2">
                <TextInput.Input
                  {...register('amount', { valueAsNumber: true })}
                  required
                  id="amount"
                  type="number"
                  defaultValue={amountInputType.defaultValue}
                  placeholder="0.00"
                  min={0.0}
                  step={0.0001}
                  onChange={handleChangeAmountInput}
                  className="!text-2xl font-semibold uppercase"
                />

                <Text
                  className={clsx(
                    'text-sm font-semibold text-zinc-700 dark:text-zinc-300 uppercase',
                    { 'animate-pulse': tokenUsdIsFetching }
                  )}
                >
                  {amounInReverseToken.toFixed(amountInputType.decimals) || 0}{' '}
                  {amountInputType?.reverseSymbol}
                </Text>
              </TextInput.Content>
            </TextInput.Root>

            <Button type="submit" className="mt-3">
              Send
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

Send.getLayout = function getLayout(page: ReactElement) {
  return <SendProvider>{page}</SendProvider>
}

export default Send
