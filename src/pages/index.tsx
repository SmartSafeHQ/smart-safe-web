import {
  Keyhole,
  Moon,
  Sun,
  Alien,
  ArrowsClockwise,
  Shield,
  ArrowRight
} from 'phosphor-react'
import { useTheme } from 'next-themes'
import Head from 'next/head'
import Link from 'next/link'

import { Heading } from '@components/Heading'
import { SmartSafeIconLogo } from '@components/Logos/SmartSafeIconLogo'
import { SelectInput } from '@components/Inputs/SelectInput'
import { Button } from '@components/Button'
import { Text } from '@components/Text'
import { TextInput } from '@components/Inputs/TextInput'

export default function Welcome() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Head>
        <title>SmartSafe</title>
        <meta
          name="description"
          content="SmartSafe decentralized custody protocol and collective asset management platform on EVM"
        />
      </Head>

      <header className="sticky top-0 left-0 w-full h-16 z-10 bg-zinc-50 dark:bg-zinc-950">
        <nav className="h-16 flex items-center m-auto px-6 select-none relative">
          <div className="flex flex-1 items-center pr-6 z-50">
            <Link
              href="/home"
              className="block w-7 h-6 p-2 -m-2 box-content relative"
            >
              <SmartSafeIconLogo className="w-6 h-6" />
            </Link>
          </div>

          <div className="flex flex-grow-0 flex-shrink-0 items-center justify-end z-50">
            {theme === 'dark' ? (
              <button
                onClick={() => setTheme('light')}
                className="p-2 flex items-center justify-center overflow-hidden border-1 border-zinc-700 rounded-full hover:border-zinc-500 hover:bg-zinc-900"
              >
                <Sun className="text-zinc-100" />
              </button>
            ) : (
              <button
                onClick={() => setTheme('dark')}
                className="p-2 flex items-center justify-center overflow-hidden border-1 border-zinc-600 rounded-full hover:border-zinc-800 hover:bg-zinc-200"
              >
                <Moon className="text-zinc-800" />
              </button>
            )}
          </div>
        </nav>
      </header>

      <div className="w-full min-h-[calc(100vh-64px)] flex flex-col flex-1 justify-center items-center p-6 relative">
        <div className="w-full max-w-[37.5rem] flex flex-1 flex-col items-stretch justify-start md:max-w-[75rem]">
          <div className="flex flex-col items-stretch justify-start flex-1 pb-6 break-words sm:pb-16 sm:pt-8">
            <Heading
              asChild
              className="text-4xl leading-10 text-start font-semibold"
            >
              <h1>Let&apos;s build something new</h1>
            </Heading>

            <Text
              asChild
              className="text-sm leading-7 text-gray-500 font-medium text-start"
            >
              <p>
                To deploy a new Project, import an existing Git Repository or
                get started with one of our Templates.
              </p>
            </Text>
          </div>

          <div className="w-full flex flex-col flex-1 items-stretch justify-start gap-11 flex-wrap md:flex-row">
            <main className="min-w-[23.25rem] flex flex-col flex-1 items-stretch justify-start p-8 relative rounded-lg border-2 border-zinc-200 dark:border-zinc-700 shadow-lg bg-white dark:bg-black">
              <div className="flex justify-center items-stretch pt-2 md:justify-start">
                <Heading asChild className="text-xl font-semibold">
                  <h1>Import Git Repository</h1>
                </Heading>
              </div>

              <div className="w-full flex flex-col items-center justify-center relative mt-4">
                <div className="w-full flex flex-col items-center justify-center gap-4 relative pb-5 border-b-1 border-zinc-200 dark:border-zinc-700 sm:flex-row">
                  <SelectInput.Root
                    value="0"
                    className="w-full"
                    defaultValue="0"
                  >
                    <SelectInput.Trigger className="w-full h-10 px-3 text-left overflow-hidden rounded-md bg-white dark:bg-black border-1 border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 hover:dark:border-zinc-600" />

                    <SelectInput.Content className="w-full border-1 bg-white dark:bg-black border-zinc-200 dark:border-zinc-700">
                      <SelectInput.Group className="w-full">
                        <SelectInput.Item
                          value="0"
                          className="w-full h-9 px-2 text-left overflow-hidden rounded-md pointer data-[highlighted]:bg-zinc-200 data-[highlighted]:dark:bg-zinc-800"
                        >
                          <div className="flex items-center gap-3">
                            <Alien className="w-4 h-4" />

                            <Text className="text-sm">pauloreis7</Text>
                          </div>
                        </SelectInput.Item>

                        <SelectInput.Item
                          value="1"
                          className="w-full h-9 px-2 text-left overflow-hidden rounded-md pointer hover:bg-zinc-200 hover:dark:bg-zinc-800"
                        >
                          <div className="flex items-center gap-3">
                            <ArrowsClockwise className="w-4 h-4" />

                            <Text className="text-sm">switch wallet</Text>
                          </div>
                        </SelectInput.Item>
                      </SelectInput.Group>
                    </SelectInput.Content>
                  </SelectInput.Root>

                  <SelectInput.Root className="w-full" defaultValue="0">
                    <SelectInput.Trigger className="w-full h-10 px-3 text-left overflow-hidden rounded-md bg-white dark:bg-black border-1 border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 hover:dark:border-zinc-600" />

                    <SelectInput.Content className="w-full border-1 bg-white dark:bg-black border-zinc-200 dark:border-zinc-700">
                      <SelectInput.Group className="w-full">
                        <SelectInput.Item
                          value="0"
                          className="w-full h-9 px-2 text-left overflow-hidden rounded-md pointer data-[highlighted]:bg-zinc-200 data-[highlighted]:dark:bg-zinc-800"
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-3 h-3 rounded-full bg-purple-500" />

                            <Text>Polygon</Text>
                          </div>
                        </SelectInput.Item>
                      </SelectInput.Group>
                    </SelectInput.Content>
                  </SelectInput.Root>
                </div>

                <form className="flex flex-col gap-3 items-stretch w-full pt-4">
                  <TextInput.Root htmlFor="name">
                    <TextInput.Label>Safe name</TextInput.Label>

                    <TextInput.Content>
                      <TextInput.Icon>
                        <Shield />
                      </TextInput.Icon>

                      <TextInput.Input
                        required
                        id="name"
                        placeholder="Enter your safe name"
                      />
                    </TextInput.Content>
                  </TextInput.Root>

                  <div className="w-full flex items-center gap-2">
                    <Text
                      asChild
                      className="text-sm font-medium text-cyan-500 transition-colors hover:text-cyan-600"
                    >
                      <Link
                        href={
                          process.env.NEXT_PUBLIC_SMART_SAFE_DISCORD_LINK ?? ''
                        }
                        target="_blank"
                      >
                        Join community to see updates
                      </Link>
                    </Text>

                    <ArrowRight className="w-4 h-4 text-cyan-500" />
                  </div>

                  <Button type="submit" className="w-full mt-3 font-semibold">
                    Continue
                  </Button>
                </form>
              </div>

              <div className="h-[22rem] flex flex-col items-center justify-center relative mt-3 p-12 rounded-md bg-zinc-50 dark:bg-zinc-900 border-1 border-zinc-200 dark:border-zinc-700">
                <div className="max-w-full flex flex-1 flex-col items-center justify-start gap-6 relative">
                  <Text
                    asChild
                    className="my-2 text-sm leading-6 text-center tracking-tighter text-gray-800 dark:text-gray-400"
                  >
                    <p>
                      Select a Git provider to import an existing project from a
                      Git Repository.
                    </p>
                  </Text>

                  <Button className="w-full max-w-xs gap-2">
                    <Keyhole className="w-6 h-6" weight="fill" />

                    <Text className="font-medium">Continue with Github</Text>
                  </Button>
                </div>
              </div>
            </main>

            <div className="w-full min-w-[24rem] min-h-[34rem] flex flex-col flex-1 items-stretch justify-start relative p-6 shadow-none rounded-lg bg-zinc-100 dark:bg-zinc-900 border-1 border-zinc-200 dark:border-zinc-700 lg:max-w-[27rem]">
              <div className="flex justify-center items-stretch mb-4 md:justify-start">
                <Heading className="text-xl font-semibold">
                  Clone Template
                </Heading>
              </div>

              <div className="w-ful flex flex-col items-center justify-center">
                <Text className="text-gray-800 dark:text-gray-400">
                  You have no safes yet!
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
