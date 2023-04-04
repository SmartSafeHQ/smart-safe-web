import { useI18n } from '@hooks/useI18n'
import { useAuth } from '@contexts/AuthContext'
import { useGetBalance } from '@/hooks/web3/useGetBalance'

import { Button } from '@/components/Button'
import { Heading } from '@/components/Heading'
import { useSellContext } from '@/contexts/pages/SellContext'
import { TokenDropDownInput } from '../../TokenDropDownInput'
import { SelectStableCoinAmount } from '../components/SelectStableCoinAmount'

import { COINS_ATTRIBUTES } from '@/utils/global/coins/config'

import type { Dispatch, SetStateAction } from 'react'
import type { Screens } from '@/pages/dashboard/buy-and-sell/sell'
import type { IBRL } from '@/utils/web3/typings'

type Props = {
  setCurrentScreen: Dispatch<SetStateAction<Screens>>
}

type StableCoins = {
  name: 'IBRL' | 'IEUR'
  symbol: 'IBRL' | 'IEUR'
  iconUrl: string
  address: string
}

const STABLE_COINS: StableCoins[] = [
  {
    name: 'IBRL',
    symbol: 'IBRL',
    iconUrl: '/favicon.svg',
    address: '0x78487e03f5e30aA3B6F72105cE247dEC80554418'
  },
  {
    name: 'IEUR',
    symbol: 'IEUR',
    iconUrl: '/favicon.svg',
    address: '0xa59f1Ad80e774e00dFb0cebdD70CB9A224b2d6E7'
  }
]

export function StableCoinAmount({ setCurrentScreen }: Props) {
  const { t } = useI18n()
  const { customer } = useAuth()
  const { trigger, watch } = useSellContext()

  const polygonRpcUrl =
    COINS_ATTRIBUTES.find(({ networkName }) => networkName === 'polygon')
      ?.rpcUrl || ''
  const { data: customerBalance } = useGetBalance<IBRL>({
    customerAddress: customer?.wallets.evm.address || '',
    networkRpcUrl: polygonRpcUrl
  })

  const tokenSymbol = watch('tokenSymbol')

  async function handlePageChange() {
    const isFieldValid = await trigger('amountToWithdraw')

    if (!isFieldValid) {
      return
    }

    setCurrentScreen('bank-account-data')
  }

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

        <TokenDropDownInput tokens={STABLE_COINS} />

        <div className="p-2 rounded-md flex border-1 bg-brand-foregroundAccent1/10 border-brand-foregroundAccent2/30 dark:border-gray-800 dark:bg-gray-800/40">
          <p>
            {t.sell.accountBalance}{' '}
            <span className="font-bold">
              {customerBalance || 0} {tokenSymbol}
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
