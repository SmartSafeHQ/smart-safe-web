import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'phosphor-react'

import { Button } from '@components/Button'
import { Heading } from '@components/Heading'
import { Text } from '@components/Text'
import { CoinsDropDownInput } from '@components/Inputs/CoinsDropDownInput'
import { Skeleton } from '@components/FetchingStates/Skeleton'
import { TextInput } from '@components/Inputs/TextInput'
import { SelectInput } from '@components/Inputs/SelectInput'

import { useI18n } from '@hooks/useI18n'

const Buy = () => {
  const { t } = useI18n()

  return (
    <div className="w-full flex flex-col items-center justify-center px-4 pt-8 gap-8 bg-gray-50 dark:bg-gray-900 md:px-8">
      <Head>
        <title>{t.buyAndSell.buy.headTitle}</title>
        <meta name="description" content={t.buyAndSell.buy.headDescription} />
      </Head>

      <div className="w-full flex justify-start items-stretch">
        <Link
          href="/dashboard/buy-and-sell"
          className="flex justify-center items-center gap-3 px-4 py-2 rounded-md font-medium capitalize transition-colors hover:bg-gray-300 hover:dark:bg-gray-800"
        >
          <ArrowLeft className="w-5 h-5" weight="bold" />

          <Text>voltar</Text>
        </Link>
      </div>

      <div className="w-full max-w-lg flex flex-1 flex-col gap-10">
        <Heading asChild className="text-gray-800 dark:text-gray-50 text-4xl">
          <h1>Comprar stable coins</h1>
        </Heading>

        <form className="w-full flex flex-col gap-8 items-stretch">
          <div className="w-full flex flex-col gap-8 items-stretch">
            <div className="w-full flex items-end justify-center group">
              <TextInput.Root htmlFor="amount" className="w-full">
                <TextInput.Label>Qual valor da compra?</TextInput.Label>

                <TextInput.Content className="rounded-r-none">
                  <TextInput.Input
                    required
                    id="amount"
                    type="number"
                    min={0.0}
                    placeholder="R$ 0.00"
                  />
                </TextInput.Content>
              </TextInput.Root>

              <SelectInput.Root className="w-44" defaultValue="0">
                <SelectInput.Trigger className="min-h-[3rem] py-1 rounded-l-none !ring-gray-700 group-focus-within:ring-2 bg-gray-300 dark:bg-gray-700" />

                {/* error => mb-[1.85rem]  */}

                <SelectInput.Content className="bg-gray-200 dark:bg-gray-800">
                  <SelectInput.Group>
                    <SelectInput.Item
                      key="BRL"
                      value={String(0)}
                      className="min-h-[1rem] py-1"
                    >
                      <div className="w-full flex items-center justify-start gap-2">
                        <Image
                          src="/languages/br.svg"
                          alt="BRL coin"
                          width={26}
                          height={26}
                        />

                        <Text className="text-lg font-bold dark:text-gray-50 uppercase">
                          BRL
                        </Text>
                      </div>
                    </SelectInput.Item>
                  </SelectInput.Group>
                </SelectInput.Content>
              </SelectInput.Root>
            </div>

            <label className="flex flex-col gap-2">
              <Text className="font-semibold">Qual a moeda?</Text>

              <CoinsDropDownInput
                coins={[{ avatar: '/networks/ibrl-logo.svg', symbol: 'ibrl' }]}
              />
            </label>

            <div className="flex items-center text-gray-800 dark:text-gray-200">
              <Skeleton isLoading={false} className="w-full h-7">
                <Text className="mr-4">Valor aproximado:</Text>

                <Image
                  src="/networks/ibrl-logo.svg"
                  alt="icon"
                  width={20}
                  height={20}
                  className="mr-2"
                />

                <Text className="font-semibold">
                  {'200'.slice(0, 5)} (R$
                  {'200'.slice(0, 4)})
                </Text>
              </Skeleton>
            </div>
          </div>

          <Button type="submit">Continuar</Button>
        </form>
      </div>
    </div>
  )
}

export default Buy
