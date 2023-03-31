import Head from 'next/head'
import { ReactElement } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { CopySimple, CurrencyDollar, ShareNetwork } from 'phosphor-react'

import { Heading } from '@components/Heading'
import { Text } from '@components/Text'
import { Button } from '@components/Button'
import { TokenverseIcon } from '@components/Logos/TokenverseIcon'
import { WalletInfos } from '@components/pages/Layouts/WalletInfos'
import { BackLink } from '@components/pages/BuyAndSell/Buy/BackLink'

import {
  BuyStableCoinProvider,
  useBuyStableCoin
} from '@contexts/BuyStableCoinContext'
import { useI18n } from '@hooks/useI18n'
import { useConverCurrencies } from '@hooks/buyAndSell/queries/useConverCurrencies'

const BuyPaymentPix = () => {
  const { currency, token } = useBuyStableCoin()
  const { t } = useI18n()
  const { data: currencyData } = useConverCurrencies(
    token.parityCurrencySymbol,
    currency.symbol
  )

  const amountInTokens = currency.amount / (currencyData?.value ?? 0)

  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center px-4 pt-8 gap-4 bg-gray-50 dark:bg-gray-900 md:px-8">
      <Head>
        <title>{t.buyAndSell.buy.headTitle}</title>
        <meta name="description" content={t.buyAndSell.buy.headDescription} />
      </Head>

      <div className="w-full flex justify-start items-stretch">
        <BackLink href="/dashboard/buy-and-sell/buy/select-method" />
      </div>

      <div className="w-full max-w-lg flex flex-1 flex-col gap-4">
        <Heading
          asChild
          className="max-w-sm text-gray-800 dark:text-gray-50 text-xl md:max-w-xl md:text-2xl"
        >
          <h1>{t.buyAndSell.buy.pixPaymentTitle}</h1>
        </Heading>

        <section className="w-full flex flex-col items-stretch gap-4">
          <div className="w-full flex flex-col items-center gap-4 p-5 rounded-md bg-gray-50 dark:bg-gray-800 shadow-md">
            <button className="flex items-center gap-2 text-sm font-semibold text-brand-foregroundAccent1 transition-colors hover:text-brand-foregroundAccent2">
              <Text>{t.buyAndSell.buy.pixCopyCode}</Text>

              <CopySimple className="w-4 h-4" />
            </button>

            <QRCodeCanvas value={''} size={180} />

            <div className="flex flex-col items-center gap-1">
              <Text
                asChild
                className="texl-lg capitalize font-medium text-gray-500 dark:text-gray-300"
              >
                <strong>{t.buyAndSell.buy.purchase}</strong>
              </Text>

              <Heading className="text-3xl">
                {token.symbol} {amountInTokens}
              </Heading>
            </div>
          </div>

          <div className="flex flex-col items-stretch gap-2">
            <WalletInfos
              title={t.buyAndSell.buy.value}
              Icon={CurrencyDollar}
              className="p-3"
            >
              <Text asChild className="text-gray-700 dark:text-gray-50">
                <strong>
                  {currency.currency} {currency.amount.toFixed(2)}
                </strong>
              </Text>
            </WalletInfos>

            <WalletInfos
              title={t.buyAndSell.buy.network}
              Icon={ShareNetwork}
              className="p-3"
            >
              <div className="flex items-center justify-start gap-2">
                <TokenverseIcon className="w-6 h-6" />

                <Text asChild className="text-gray-700 dark:text-gray-50">
                  <strong>Tokenverse</strong>
                </Text>
              </div>
            </WalletInfos>
          </div>

          <Button className="uppercase">{t.buyAndSell.buy.validatePay}</Button>
        </section>
      </div>
    </div>
  )
}

BuyPaymentPix.getLayout = function getLayout(page: ReactElement) {
  return <BuyStableCoinProvider>{page}</BuyStableCoinProvider>
}

export default BuyPaymentPix
