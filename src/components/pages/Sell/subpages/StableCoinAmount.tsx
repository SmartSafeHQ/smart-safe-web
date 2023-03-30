import { useI18n } from '@hooks/useI18n'
import { useAuth } from '@contexts/AuthContext'
import { useGetBalance } from '@/hooks/web3/useGetBalance'

import { Button } from '@/components/Button'
import { Heading } from '@/components/Heading'
import { useSellContext } from '@/contexts/pages/SellContext'
import { TokenDropDownInput } from '../../BuyAndSell/TokenDropDownInput'
import { SelectStableCoinAmount } from '../components/SelectStableCoinAmount'

import { COINS_ATTRIBUTES } from '@/utils/global/coins/config'

import type { Dispatch, SetStateAction } from 'react'
import type { Screens } from '@/pages/dashboard/buy-and-sell/sell'

type Props = {
  setCurrentScreen: Dispatch<SetStateAction<Screens>>
}

const STABLE_COINS = [
  {
    name: 'IBRL',
    symbol: 'IBRL',
    iconUrl: '/favicon.svg',
    address: '0xfC28Ef7C5ff2f5EA55E70E3944041718Df42A371'
  }
]

export function StableCoinAmount({ setCurrentScreen }: Props) {
  const { t } = useI18n()
  const { customer } = useAuth()
  const { trigger } = useSellContext()
  const { data: customerBalance } = useGetBalance({
    customerAddress: customer?.wallets.evm.address || '',
    networkRpcUrl:
      COINS_ATTRIBUTES.find(({ networkName }) => networkName === 'polygon')
        ?.rpcUrl || ''
  })

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
          <Heading className="text-3xl">{t.sell.heading}</Heading>
        </div>

        <div>
          <p className="font-bold">{t.sell.wallet}: </p>

          {customer?.wallets.evm.formattedAddress}
        </div>

        <TokenDropDownInput tokens={STABLE_COINS} />

        <div className="p-2 rounded-md flex border-1 bg-brand-foregroundAccent1/10 border-brand-foregroundAccent2/30 dark:border-gray-800 dark:bg-gray-800/40">
          <p>
            {t.sell.accountBalance}{' '}
            <span className="font-bold">{customerBalance || 0} iBRL</span>
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
