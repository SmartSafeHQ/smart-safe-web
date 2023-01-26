import Head from 'next/head'
import { CurrencyDollar, Wallet } from 'phosphor-react'

import { Button } from '@components/Button'
import { TextInput } from '@components/Inputs/TextInput'
import { Heading } from '@components/Heading'
import { Text } from '@components/Text'
import { Avatar } from '@components/Avatar'

import { useSend } from '@hooks/send/useSend'

const Send = () => {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    selectedCoin,
    currentAmount,
    currentMaticAmount,
    currentMaticFee,
    currentDollarFee
  } = useSend()

  return (
    <div className="w-full flex flex-col items-center justify-center px-2 pt-24">
      <Head>
        <title>Tokenverse | Send</title>
        <meta name="description" content="Tokenverse dashboard home" />
      </Head>

      <div className="w-full max-w-lg flex flex-1 flex-col">
        <div className="w-full flex items-center flex-col gap-4 mb-8">
          <Heading
            asChild
            className="text-3xl font-semibold text-gray-800 dark:text-gray-50 md:text-4xl"
          >
            <h1>Send ${currentAmount.toFixed(2)}</h1>
          </Heading>

          <div className="w-full flex items-center justify-center gap-2">
            <Text className="text-gray-700 dark:text-gray-300 text-xl font-semibold uppercase">
              {currentMaticAmount.toFixed(2)} {selectedCoin.id}
            </Text>

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
            labelText="To"
            error={errors.sendWallet?.message}
          >
            <TextInput.Icon>
              <Wallet />
            </TextInput.Icon>

            <TextInput.Input
              {...register('sendWallet')}
              required
              id="destination-wallet"
              placeholder="Enter account address"
            />
          </TextInput.Root>

          <TextInput.Root
            htmlFor="amount"
            labelText="Amount"
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
              min={1}
              defaultValue={1}
              placeholder="Enter amount in dollar"
            />
          </TextInput.Root>

          <div className="flex items-center text-gray-800 dark:text-gray-200">
            <Text className="mr-2">Fee:</Text>
            <Avatar.Root fallbackName="MA" className="w-5 h-5 mr-2">
              <Avatar.Image
                src={selectedCoin.avatar}
                alt={`${selectedCoin.name} icon`}
              />
            </Avatar.Root>
            <Text className="font-semibold">
              {currentMaticFee.toFixed(2)} (${currentDollarFee.toFixed(2)})
            </Text>
          </div>

          <Button isLoading={isSubmitting} className="mt-1">
            Send
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Send
