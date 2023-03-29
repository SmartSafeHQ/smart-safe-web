import Head from 'next/head'
import { useIMask } from 'react-imask'
import { Coin } from 'phosphor-react'

import { Button } from '@components/Button'
import { TextInput } from '@components/Inputs/TextInput'
import { TokenDropDownInput } from '@components/pages/BuyAndSell/TokenDropDownInput'

import { useI18n } from '@hooks/useI18n'
import { useGetBalance } from '@/hooks/web3/useGetBalance'
import { useAuth } from '@contexts/AuthContext'

import { COINS_ATTRIBUTES } from '@/utils/global/coins/config'
import { Heading } from '@/components/Heading'

const STABLE_COINS = [
  {
    name: 'IBRL',
    symbol: 'IBRL',
    iconUrl: '/favicon.svg',
    address: '0xfC28Ef7C5ff2f5EA55E70E3944041718Df42A371'
  }
]

const Sell = () => {
  const { t } = useI18n()
  const { customer } = useAuth()
  const { data: customerBalance } = useGetBalance({
    customerAddress: customer?.wallets.evm.address || '',
    networkRpcUrl:
      COINS_ATTRIBUTES.find(({ networkName }) => networkName === 'polygon')
        ?.rpcUrl || ''
  })
  const { ref, value, setValue } = useIMask({
    mask: Number,
    scale: 2,
    signed: true,
    padFractionalZeros: true,
    radix: ',',
    mapToRadix: ['.']
  })

  return (
    <div className="flex flex-1 flex-col items-center px-4 pt-6 bg-gray-50 dark:bg-gray-900 md:px-8">
      <Head>
        <title>{t.buyAndSell.sell.headTitle}</title>
        <meta name="description" content={t.buyAndSell.sell.headDescription} />
      </Head>

      <div className="max-w-xl flex flex-1 flex-col items-stretch gap-2 pt-10">
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

        <div className="flex flex-col gap-2">
          <TextInput.Root htmlFor="quantity" variant="secondary">
            <TextInput.Label>{t.sell.amountToWithdraw}</TextInput.Label>

            <TextInput.Content>
              <TextInput.Icon>
                <Coin size={32} />
              </TextInput.Icon>

              <TextInput.Input
                ref={ref}
                required
                onChange={({ target: { value } }) => {
                  setValue(value)
                }}
                value={value}
                type="text"
                id="quantity"
                placeholder={t.sell.amountOfTokensToWithdraw}
              />
            </TextInput.Content>
          </TextInput.Root>

          <div className="p-2 rounded-md flex border-1 bg-brand-foregroundAccent1/10 border-brand-foregroundAccent2/30 dark:border-gray-800 dark:bg-gray-800/40">
            <p className="flex flex-col gap-1">
              {t.sell.youWillWithdraw}{' '}
              <span className="font-bold">
                {Intl.NumberFormat('pt-BR', {
                  currency: 'BRL',
                  style: 'currency'
                }).format(Number(value.replace(',', '')) / 100)}
              </span>
            </p>
          </div>
        </div>

        <Button>{t.sell.bankData}</Button>
      </div>
    </div>
  )
}

export default Sell
