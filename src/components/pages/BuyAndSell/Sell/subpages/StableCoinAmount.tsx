import { useEffect } from 'react'
import Image from 'next/image'

import { useI18n } from '@hooks/useI18n'
import { useAuth } from '@contexts/AuthContext'
import { useGetBalance } from '@hooks/web3/useGetBalance'

import { Button } from '@components/Button'
import { Heading } from '@components/Heading'
import { StableCoin, useSellContext } from '@contexts/pages/SellContext'
import { SelectStableCoinAmount } from '../components/SelectStableCoinAmount'
import { SelectInput } from '@components/Inputs/SelectInput'
import { Text } from '@components/Text'

import { COINS_ATTRIBUTES } from '@utils/global/coins/config'
import { STABLE_COINS } from '@utils/global/coins/stableCoinsConfig'

import type { Dispatch, SetStateAction } from 'react'
import type { Screens } from '@/pages/dashboard/buy-and-sell/sell'

type Props = {
  setCurrentScreen: Dispatch<SetStateAction<Screens>>
}

export function StableCoinAmount({ setCurrentScreen }: Props) {
  const { t } = useI18n()
  const { customer } = useAuth()
  const { trigger, watch, setValue, handleSetDropDownInputValue } =
    useSellContext()

  const tokenSymbol = watch('tokenSymbol')
  const selectedStableCoin = watch('selectedStableCoin')

  const polygonRpcUrl =
    COINS_ATTRIBUTES.find(({ networkName }) => networkName === 'polygon')
      ?.rpcUrl || ''
  const { data: customerBalance } = useGetBalance({
    customerAddress: customer?.wallets.evm.address || '',
    networkRpcUrl: polygonRpcUrl,
    contractAddress: selectedStableCoin?.contractAddress || '',
    contractName: selectedStableCoin?.symbol || ''
  })

  async function handlePageChange() {
    const isFieldValid = await trigger('amountToWithdraw')

    if (!isFieldValid) {
      return
    }

    setCurrentScreen('bank-account-data')
  }

  useEffect(() => {
    setValue('tokenSymbol', STABLE_COINS[0].symbol)
    setValue('selectedStableCoin', STABLE_COINS[0])
  }, [])

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="mb-4">
          <Heading className="text-3xl">{t.sell.headings.sell}</Heading>
        </div>

        <div>
          <p className="font-bold">{t.sell.wallet}: </p>

          {customer?.wallets.evm.formattedAddress}
        </div>

        <SelectInput.Root
          className="w-full"
          defaultValue={STABLE_COINS[0].symbol}
          onValueChange={async stableCoinSymbol => {
            handleSetDropDownInputValue(stableCoinSymbol, 'tokenSymbol')
            setValue(
              'selectedStableCoin',
              STABLE_COINS.find(
                token => token.symbol === stableCoinSymbol
              ) as StableCoin
            )
          }}
        >
          <SelectInput.Trigger className="min-h-[3rem] py-1 bg-gray-200 dark:bg-gray-800" />

          <SelectInput.Content className="bg-gray-200 dark:bg-gray-800">
            <SelectInput.Group>
              {STABLE_COINS.map(token => (
                <SelectInput.Item
                  key={token.symbol}
                  value={token.symbol}
                  className="min-h-[3rem] py-1"
                >
                  <div className="w-full flex items-center justify-start gap-2">
                    <Image
                      src={token.avatar}
                      alt={`${token.symbol} token`}
                      width={28}
                      height={28}
                    />

                    <Text className="text-xl font-bold dark:text-gray-50 uppercase">
                      {token.symbol}
                    </Text>
                  </div>
                </SelectInput.Item>
              ))}
            </SelectInput.Group>
          </SelectInput.Content>
        </SelectInput.Root>

        <div className="p-2 rounded-md flex border-1 bg-brand-foregroundAccent1/10 border-brand-foregroundAccent2/30 dark:border-gray-800 dark:bg-gray-800/40">
          <p>
            {t.sell.accountBalance}{' '}
            <span className="font-bold">
              {customerBalance} {tokenSymbol}
            </span>
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <SelectStableCoinAmount />

        <Button onClick={handlePageChange}>{t.sell.bankData}</Button>
      </div>
    </>
  )
}
