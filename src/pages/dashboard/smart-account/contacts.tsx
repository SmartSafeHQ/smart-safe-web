import Head from 'next/head'
import Link from 'next/link'
import { ArrowSquareOut, Copy, DotsThreeVertical } from 'phosphor-react'

import {
  SMART_ACCOUNT_TABS_VALUES,
  SmartAccountTabsList
} from '@components/pages/SmartAccount/SmartAccountTabsList'
import { Button } from '@components/Button'
import { Tabs } from '@components/Tabs'
import { Text } from '@components/Text'
import { SmartAccountTab } from '@components/pages/SmartAccount'
import { ScrollArea } from '@components/ScrollArea'
import { HoverCard } from '@components/HoverCard'
import { DropdownMenu } from '@components/DropdownMenu'

import { useI18n } from '@hooks/useI18n'

const SmartAccount = () => {
  const { t } = useI18n()

  return (
    <div className="flex flex-1 flex-col items-center px-2 pt-2 bg-gray-50 dark:bg-gray-900 md:pt-6">
      <Head>
        <title>{t.saContacts.headTitle}</title>
        <meta name="description" content={t.saContacts.headDescription} />
      </Head>

      <div className="w-full flex flex-1 flex-col items-stretch">
        <Tabs.Root defaultValue={SMART_ACCOUNT_TABS_VALUES.CONTACTS}>
          <SmartAccountTabsList />

          <Tabs.Content value={SMART_ACCOUNT_TABS_VALUES.CONTACTS}>
            <SmartAccountTab.Root>
              <SmartAccountTab.Header>
                <div className="w-full flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center">
                  <div className="flex flex-col relative justify-start items-stretch gap-3">
                    <SmartAccountTab.Title>
                      {t.saContacts.title}
                    </SmartAccountTab.Title>

                    <SmartAccountTab.Description>
                      {t.saContacts.description}
                    </SmartAccountTab.Description>
                  </div>

                  <Button className="w-max">{t.saContacts.addContact}</Button>
                </div>
              </SmartAccountTab.Header>

              <div className="w-full pb-3 flex flex-col relative justify-start items-stretch gap-5">
                <ScrollArea className="w-full max-w-full">
                  <table className="w-full">
                    <thead className="bg-gray-200 bg-opacity-60 border-[0.5px] border-[#e0e0e0] dark:border-[#333] dark:bg-gray-800">
                      <tr className="uppercase text-gray-500 dark:text-gray-400">
                        <th className="pl-2 py-3 whitespace-nowrap text-start font-medium text-xs md:text-xs">
                          {t.saContacts.name}
                        </th>

                        <th className="py-3 whitespace-nowrap text-start font-medium text-xs md:text-xs">
                          {t.saContacts.address}
                        </th>

                        <th />
                      </tr>
                    </thead>

                    <tbody>
                      <tr className="[&>*]:min-w-[7rem] font-medium border-b-1 border-gray-300 dark:border-gray-700">
                        <td className="pl-2 py-3">
                          <Text className="font-medium capitalize md:text-base">
                            Paulo Reis
                          </Text>
                        </td>

                        <td>
                          <div className="flex items-center gap-6 text-gray-600 dark:text-gray-400">
                            <Text>w02d...0fds</Text>

                            <div className="flex items-center gap-2">
                              <HoverCard.Root>
                                <HoverCard.Trigger asChild>
                                  <button>
                                    <Copy className="w-5 h-5" />
                                  </button>
                                </HoverCard.Trigger>

                                <HoverCard.Content className="text-sm">
                                  {t.saContacts.copyAddr}
                                  <HoverCard.Arrow />
                                </HoverCard.Content>
                              </HoverCard.Root>

                              <HoverCard.Root>
                                <HoverCard.Trigger asChild>
                                  <Link href="#" target="_blank">
                                    <ArrowSquareOut className="w-5 h-5" />
                                  </Link>
                                </HoverCard.Trigger>

                                <HoverCard.Content className="text-sm">
                                  {t.saContacts.seeExplorer}
                                  <HoverCard.Arrow />
                                </HoverCard.Content>
                              </HoverCard.Root>
                            </div>
                          </div>
                        </td>

                        <td className="py-3 pr-1 flex items-center justify-end">
                          <DropdownMenu.Root>
                            <DropdownMenu.Trigger>
                              <button
                                aria-label={t.saContacts.menuAriaLabel}
                                className="p-1 rounded-sm transition-colors hover:bg-gray-200 dark:hover:bg-gray-800"
                              >
                                <DotsThreeVertical className="w-6 h-6" />
                              </button>
                            </DropdownMenu.Trigger>

                            <DropdownMenu.Content
                              sideOffset={8}
                              align="end"
                              className="min-w-[10rem] p-2"
                            >
                              <DropdownMenu.Item className="px-3 py-2 rounded-md text-sm">
                                {t.saContacts.edit}
                              </DropdownMenu.Item>

                              <DropdownMenu.Item className="px-3 py-2 rounded-md text-sm">
                                <Text className="text-sm text-red-500">
                                  {t.saContacts.delete}
                                </Text>
                              </DropdownMenu.Item>
                            </DropdownMenu.Content>
                          </DropdownMenu.Root>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </ScrollArea>
              </div>
            </SmartAccountTab.Root>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  )
}

export default SmartAccount
