import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { Wrench } from '@phosphor-icons/react'

import { Button } from '@components/Button'
import { PageLayout } from '@components/pages/Layouts/PageLayout'
import { Text } from '@components/Text'

import okxSwap from '../../../../../public/okx-swap.png'

const Swap = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Head>
        <title>SmartSafe | OKX Swap</title>
        <meta
          name="description"
          content="Smart safe integration with OKX bridge swap"
        />
      </Head>

      <div className="w-full flex flex-1 flex-col items-stretch">
        <PageLayout.Root>
          <PageLayout.Header className="justify-center items-start gap-3 pb-8 pt-10 px-3">
            <div className="w-full flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center">
              <PageLayout.Title>OKX Swap</PageLayout.Title>

              <Button asChild className="w-max">
                <Link href="https://www.okx.com/" target="_blank">
                  Trade on okx
                </Link>
              </Button>
            </div>

            <PageLayout.Description>
              Swap your safe tokens with secure OKX bridges!
            </PageLayout.Description>
          </PageLayout.Header>

          <div className="w-full pb-3 pt-6 px-2 flex flex-col relative justify-center items-center gap-5">
            <div className="w-full flex items-center justify-start gap-2">
              <Wrench className="w-5 h-5 text-gray-500" />

              <Text className="text-gray-500">Under development</Text>
            </div>

            <Image
              src={okxSwap}
              alt="okx crypto exchange logo"
              quality={100}
              width={400}
              height={420}
            />
          </div>
        </PageLayout.Root>
      </div>
    </div>
  )
}

export default Swap
