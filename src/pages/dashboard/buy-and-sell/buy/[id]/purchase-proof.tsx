import { utils } from 'ethers'
import Head from 'next/head'
import Link from 'next/link'
import { GetServerSideProps } from 'next'
import { CheckCircle, Receipt } from 'phosphor-react'

import { Heading } from '@components/Heading'
import { Text } from '@components/Text'

import { NextPageWithLayout } from '@utils/global/types'
import { useI18n } from '@hooks/useI18n'

interface PurchaseProofProps {
  invoiceId: string
  tokenSymbol: string
  purchaseDate: string
  amountInTokens: string
}

const PurchaseProof: NextPageWithLayout<PurchaseProofProps> = ({
  invoiceId,
  tokenSymbol,
  purchaseDate,
  amountInTokens
}) => {
  const { t } = useI18n()

  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center px-4 pt-8 gap-4 bg-gray-50 dark:bg-gray-900 md:px-8">
      <Head>
        <title>{t.buyAndSell.buy.headTitle}</title>
        <meta name="description" content={t.buyAndSell.buy.headDescription} />
      </Head>

      <section className="w-full max-w-lg flex flex-col items-center justify-center gap-6">
        <div className="w-full flex flex-col items-center justify-center gap-8">
          <Heading asChild className="text-gray-800 dark:text-gray-50 text-4xl">
            <h1>{t.buyAndSell.buy.proofTitle}</h1>
          </Heading>

          <div className="p-3 rounded-full bg-gray-200 dark:bg-gray-800">
            <CheckCircle className="w-20 h-20 text-brand-foregroundAccent1" />
          </div>
        </div>

        <div className="w-full flex flex-col items-center justify-center gap-6">
          <div className="w-full flex flex-col items-center justify-center gap-6">
            <div className="w-full flex flex-col items-center justify-center gap-4 pb-6 border-b-1 border-gray-300 dark:border-gray-600">
              <Text className="text-lg uppercase text-gray-500 dark:text-gray-400">
                {new Date(purchaseDate).toLocaleDateString('pt-BR')}
              </Text>

              <Text asChild className="text-4xl uppercase">
                <strong>
                  {tokenSymbol} {utils.formatEther(amountInTokens)}
                </strong>
              </Text>
            </div>

            <Text
              asChild
              className="flex flex-col items-center justify-center gap-3 p-3 rounded-md font-medium capitalize transition-colors hover:bg-gray-200 hover:dark:bg-gray-800"
            >
              <a
                href={`https://mumbai.polygonscan.com/tx/${invoiceId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Receipt className="w-8 h-8 text-brand-foregroundAccent1" />

                <Text>{t.buyAndSell.buy.seeInvoice}</Text>
              </a>
            </Text>
          </div>

          <Link
            href="/dashboard/buy-and-sell"
            className="font-medium transition-colors underline text-brand-foregroundAccent1 hover:text-brand-foregroundAccent2"
          >
            {t.buyAndSell.buy.backTo}
          </Link>
        </div>
      </section>
    </div>
  )
}

export default PurchaseProof

export const getServerSideProps: GetServerSideProps<
  PurchaseProofProps
> = async data => {
  console.log(data.query)
  return {
    props: {
      invoiceId: (data.query.id as string) || '',
      tokenSymbol: (data.query.stableCoinSymbol as string) || '',
      purchaseDate: (data.query.date as string) || '',
      amountInTokens: (data.query.amount as string) || ''
    }
  }
}
