import { Wallet } from '@phosphor-icons/react'
import { ReactElement } from 'react'
import Image from 'next/image'
import Head from 'next/head'
import clsx from 'clsx'

import { SendSelectToken } from '@components/pages/Send/SendSelectToken'
import { TextInput } from '@components/Inputs/TextInput'
import { Text } from '@components/Text'
import { Button } from '@components/Button'
import { SendModal } from '@components/pages/Send/SendModal'

import { SendProvider } from '@contexts/SendContext'
import { useSendHook } from '@hooks/send/useSendHook'

const Send = () => {
  const {
    tokens,
    selectedToken,
    tokensIsLoading,
    handleChangeToken,
    handleChangeAmountInput,
    register,
    handleSubmit,
    errors,
    onSubmit,
    tokenUsdIsFetching,
    usdAmount
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
              <TextInput.Label>Amount</TextInput.Label>

              <TextInput.Content className="flex-col !items-start gap-2 py-2">
                <div className="w-full flex items-center justify-between">
                  <TextInput.Input
                    {...register('amount')}
                    required
                    id="amount"
                    defaultValue="1.00"
                    placeholder="0.00"
                    onChange={handleChangeAmountInput}
                    className="max-w-[10rem] !text-3xl font-semibold uppercase"
                  />

                  <div className="h-10 min-w-[6.5rem] flex items-center gap-2 px-2 rounded-full dark:bg-zinc-800">
                    {selectedToken && (
                      <>
                        <Image
                          src={selectedToken.icon}
                          alt="token to send transaction approve"
                          width={24}
                          height={24}
                        />

                        <Text className="uppercase">
                          {selectedToken.symbol}
                        </Text>
                      </>
                    )}
                  </div>
                </div>

                <Text
                  className={clsx(
                    'text-sm font-medium text-zinc-700 dark:text-zinc-300 uppercase',
                    { 'animate-pulse': tokenUsdIsFetching }
                  )}
                >
                  USD ${usdAmount?.toFixed(4) ?? 0}
                </Text>
              </TextInput.Content>
            </TextInput.Root>

            <Button type="submit" className="mt-3">
              Send
            </Button>
          </form>

          <SendModal />
        </div>
      </div>
    </div>
  )
}

Send.getLayout = function getLayout(page: ReactElement) {
  return <SendProvider>{page}</SendProvider>
}

export default Send
