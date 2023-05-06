import Link from 'next/link'
import { useConnectWallet } from '@web3-onboard/react'
import { ArrowLeft, ArrowSquareOut, CaretDown, Plus } from 'phosphor-react'
import Image from 'next/image'

import { TextInput } from '@components/Inputs/TextInput'
import { Collapsible } from '@components/Collapsible'
import { SelectInput } from '@components/Inputs/SelectInput'
import { Button } from '@components/Button'
import { Heading } from '@components/Heading'
import { Text } from '@components/Text'

import { useWallet } from '@contexts/WalletContext'
import { useCreateSafe } from '@contexts/create-safe/CreateSafeContext'

export function CreateSafeDeployContent() {
  const [{ wallet }] = useConnectWallet()
  const { formattedAddress } = useWallet()
  const { safeInfos } = useCreateSafe()

  return (
    <div className="w-full min-h-[calc(100vh-64px)] flex flex-col flex-1 justify-center items-center px-6 py-7 relative lg:py-12">
      <div className="w-full max-w-[76rem] flex flex-1 flex-col items-stretch justify-start">
        <div className="w-full flex flex-col items-stretch justify-start pb-7 break-word lg:pb-10">
          <Text
            asChild
            className="flex items-center gap-2 mb-6 text-sm text-zinc-400 transition-colors hover:text-zinc-500"
          >
            <Link href="/">
              <ArrowLeft className="w-4 h-4 text-zinc-400" />
              Back
            </Link>
          </Text>

          <Heading
            asChild
            className="text-4xl leading-[2.75rem] text-start font-semibold"
          >
            <h1>You&apos;re almost done.</h1>
          </Heading>

          <Text
            asChild
            className="text-sm leading-7 text-zinc-600 dark:text-zinc-500 font-semibold text-start"
          >
            <p>
              Please follow the steps to configure your Project and deploy it.
            </p>
          </Text>
        </div>

        <div className="w-full flex flex-col flex-1 items-stretch justify-start gap-9 lg:flex-row lg:gap-[4.5rem]">
          <aside className="w-full flex flex-col items-stretch justify-start lg:w-72">
            <div className="flex items-center justify-center gap-3 p-6 rounded-lg bg-zinc-200 dark:bg-zinc-700">
              <Image
                src={`data:image/svg+xml;utf8,${encodeURIComponent(
                  wallet?.icon
                )}`}
                alt="wallet connector provider icon"
                width={24}
                height={24}
                className="w-6 h-6"
              />

              <Text className="text-sm font-medium">{formattedAddress}</Text>
            </div>

            <div className="w-full pt-6 flex flex-col items-stretch justify-start gap-4 lg:pt-14">
              <Text className="text-xs leading-5 hidden font-semibold uppercase text-zinc-800 dark:text-zinc-400 lg:block">
                Network deploy
              </Text>

              <div className="w-full flex items-center gap-3">
                <Image
                  src={safeInfos?.chain.icon}
                  alt="chain to deploy safe icon"
                  width={28}
                  height={28}
                  className="w-7 h-7"
                />

                <Text asChild className="font-medium capitalize">
                  <strong>{safeInfos?.chain.networkName}</strong>
                </Text>
              </div>
            </div>
          </aside>

          <main className="min-w-[23.25rem] flex flex-col flex-1 items-stretch justify-start gap-6 p-6 relative rounded-md border-2 border-zinc-200 dark:border-zinc-700 shadow-lg bg-white dark:bg-black lg:p-8">
            <div className="flex justify-start items-stretch pb-5 border-b-1 border-zinc-200 dark:border-zinc-700">
              <Heading className="text-2xl font-semibold">
                Configure safe
              </Heading>
            </div>

            <form className="w-full flex flex-col items-stretch justify-start gap-4 relative">
              <TextInput.Root htmlFor="name">
                <TextInput.Label>Safe name</TextInput.Label>

                <TextInput.Content>
                  <TextInput.Input
                    required
                    id="name"
                    defaultValue={safeInfos?.name}
                    placeholder="Enter your safe name"
                  />
                </TextInput.Content>
              </TextInput.Root>

              <Collapsible.Root
                defaultOpen={true}
                className="w-full p-3 rounded-md border-1 border-zinc-200 dark:border-zinc-700 ring-zinc-800 dark:ring-zinc-400 focus-within:ring-1"
              >
                <Collapsible.Trigger className="relative flex items-center justify-start gap-2 select-none outline-none text-base font-medium text-zinc-800 dark:text-zinc-400 cursor-pointer">
                  <CaretDown className="w-4 h-4" />

                  <Text asChild className="text-sm font-normal">
                    <strong>Owner wallets to confirm a transaction</strong>
                  </Text>
                </Collapsible.Trigger>

                <Collapsible.Content className="w-full flex flex-col items-stretch justify-start gap-4">
                  <div className="w-full flex items-center justify-start gap-6 pt-6">
                    <TextInput.Root htmlFor="ownerName" className="flex flex-1">
                      <TextInput.Label>Owner name</TextInput.Label>

                      <TextInput.Content>
                        <TextInput.Input
                          required
                          id="ownerName"
                          placeholder="Example name"
                        />
                      </TextInput.Content>
                    </TextInput.Root>

                    <TextInput.Root
                      htmlFor="ownerWallet"
                      className="flex flex-1"
                    >
                      <TextInput.Label>Owner address</TextInput.Label>

                      <TextInput.Content>
                        <TextInput.Input
                          required
                          id="ownerWallet"
                          placeholder="Enter owner wallet address"
                        />
                      </TextInput.Content>
                    </TextInput.Root>
                  </div>

                  <div className="w-full flex items-stretch justify-start ">
                    <button
                      type="button"
                      className="flex items-center gap-2 py-2 px-3 text-sm text-cyan-500 rounded-md bg-transparent transition-colors hover:bg-cyan-300 hover:bg-opacity-20"
                    >
                      <Plus className="w-4 h-4" />
                      Add owner
                    </button>
                  </div>

                  <footer className="w-full mt-auto flex items-center justify-end">
                    <Text
                      asChild
                      className="flex items-center gap-1 text-sm font-medium text-cyan-500 transition-colors hover:text-cyan-600"
                    >
                      <Link href={'link to'} target="_blank">
                        Learn more about multi sign owners
                        <ArrowSquareOut className="w-4 h-4 text-cyan-500" />
                      </Link>
                    </Text>
                  </footer>
                </Collapsible.Content>
              </Collapsible.Root>

              <div className="flex flex-col justify-start items-stretch gap-4">
                <div className="flex flex-col justify-start items-stretch">
                  <Text
                    asChild
                    className="text-lg leading-9 font-semibold text-zinc-800 dark:text-zinc-100"
                  >
                    <strong>Transaction confirmation (1 of 5)</strong>
                  </Text>

                  <Text className="text-sm text-zinc-600 dark:text-zinc-400">
                    Owners confirmations needed to run a transaction
                  </Text>
                </div>

                <SelectInput.Root
                  defaultValue="1"
                  className="w-full flex flex-1"
                >
                  <SelectInput.Trigger className="w-full h-10 px-3 text-left overflow-hidden rounded-md bg-white dark:bg-black capitalize border-1 border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 hover:dark:border-zinc-600" />

                  <SelectInput.Content className="w-full border-1 bg-white dark:bg-black border-zinc-200 dark:border-zinc-700">
                    <SelectInput.Group className="w-full">
                      <SelectInput.Item
                        value="1"
                        className="w-full h-9 px-2 text-left overflow-hidden rounded-md capitalize pointer data-[highlighted]:bg-zinc-200 data-[highlighted]:dark:bg-zinc-800"
                      >
                        <div className="flex items-center gap-3">
                          <Text>1</Text>
                        </div>
                      </SelectInput.Item>
                    </SelectInput.Group>
                  </SelectInput.Content>
                </SelectInput.Root>

                <div className="flex items-center text-sm font-medium text-zinc-600 dark:text-zinc-400">
                  <Text className="mr-2">Est. network fee:</Text>

                  <Image
                    src={safeInfos?.chain.icon}
                    alt="chain to deploy safe icon"
                    width={20}
                    height={20}
                    className="mr-2"
                  />

                  <Text>0.001 matic</Text>
                </div>
              </div>

              <Button type="submit" className="w-full mt-2">
                Create safe
              </Button>
            </form>
          </main>
        </div>
      </div>
    </div>
  )
}
