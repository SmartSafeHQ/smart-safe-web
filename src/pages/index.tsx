import { Keyhole, Moon, Sun } from 'phosphor-react'
import { useTheme } from 'next-themes'
import Head from 'next/head'
import Link from 'next/link'

import { Heading } from '@components/Heading'
import { SmartSafeIconLogo } from '@components/Logos/SmartSafeIconLogo'
import { Button } from '@components/Button'
import { Text } from '@components/Text'

export default function Welcome() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center ">
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
            {theme === 'light' ? (
              <button
                onClick={() => setTheme('dark')}
                className="p-2 flex items-center justify-center overflow-hidden border-1 border-zinc-600 rounded-full hover:border-zinc-800 hover:bg-zinc-200"
              >
                <Moon className="text-zinc-800" />
              </button>
            ) : (
              <button
                onClick={() => setTheme('light')}
                className="p-2 flex items-center justify-center overflow-hidden border-1 border-zinc-700 rounded-full hover:border-zinc-500 hover:bg-zinc-900"
              >
                <Sun className="text-zinc-100" />
              </button>
            )}
          </div>
        </nav>
      </header>

      <div className="w-full min-h-[calc(100vh-64px)] flex flex-col flex-1 justify-center items-center p-6 relative">
        <div className="w-full max-w-[37.5rem] flex flex-1 flex-col items-stretch justify-start md:max-w-[68rem]">
          <div className="flex flex-col items-stretch justify-start flex-1 pb-6 break-words sm:pb-16 sm:pt-4">
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
              <div className="flex justify-center items-stretch mb-3 md:justify-start">
                <Heading asChild className="text-xl font-semibold">
                  <h1>Import Git Repository</h1>
                </Heading>
              </div>

              <div className="h-[22rem] flex flex-col items-center justify-center relative p-12 rounded-md bg-zinc-50 dark:bg-zinc-900 border-1 border-zinc-200 dark:border-zinc-700">
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
