import { DiscordLogo, LinkedinLogo, TwitterLogo } from 'phosphor-react'
import Head from 'next/head'
import Link from 'next/link'

import { Heading } from '@components/Heading'
import { Button } from '@components/Button'
import { TokenverseIcon } from '@components/Logos/TokenverseIcon'
import { Text } from '@components/Text'

import {
  TOKENVERSE_DISCORD_LINK,
  TOKENVERSE_LINKEDIN_LINK,
  TOKENVERSE_TWITTER_LINK
} from '@utils/global/constants/links'

const SignIn = () => {
  return (
    <div className="w-full flex flex-1 flex-col justify-center items-center px-2 pt-8">
      <Head>
        <title>Tokenverse | SignIn</title>
        <meta name="description" content="Tokenverse sign in" />
      </Head>

      <div className="w-full max-w-sm flex flex-col justify-center text-center md:max-w-md">
        <div className="w-full flex flex-col gap-4 mb-8">
          <Heading
            asChild
            className="text-2xl font-semibold text-gray-800 dark:text-gray-50 md:text-3xl"
          >
            <h1>Connect your account</h1>
          </Heading>

          <Heading className="font-normal text-base text-gray-600 dark:text-gray-400 md:text-lg">
            Connect your accounts and unlock the whole tokenverse experience
          </Heading>
        </div>

        <Button className="flex items-center gap-2 mb-8 rounded-3xl">
          <TokenverseIcon className="w-4 h-4 md:w-5 md:h-5 [&>*]:fill-gray-900" />
          <Text>Login with Tokenverse</Text>
        </Button>

        <div className="w-full flex flex-col gap-3 pt-5 mb-9 border-t-2 border-t-gray-400 dark:border-t-gray-600">
          <Text className="font-medium text-gray-800 dark:text-gray-400">
            Follow us!
          </Text>

          <div className="w-full flex items-center justify-center gap-4">
            <Link
              href={TOKENVERSE_DISCORD_LINK}
              target="_blank"
              className="w-fit p-3 bg-gray-200 dark:bg-gray-700 rounded-full transition-all hover:brightness-90 hover:dark:brightness-75"
            >
              <DiscordLogo className="w-7 h-7 text-cyan-500" />
            </Link>

            <Link
              href={TOKENVERSE_TWITTER_LINK}
              target="_blank"
              className="w-fit p-3 bg-gray-200 dark:bg-gray-700 rounded-full transition-all hover:brightness-90 hover:dark:brightness-75"
            >
              <TwitterLogo className="w-7 h-7 text-cyan-500" />
            </Link>

            <Link
              href={TOKENVERSE_LINKEDIN_LINK}
              target="_blank"
              className="w-fit p-3 bg-gray-200 dark:bg-gray-700 rounded-full transition-all hover:brightness-90 hover:dark:brightness-75"
            >
              <LinkedinLogo className="w-7 h-7 text-cyan-500" />
            </Link>
          </div>
        </div>

        <Text className="text-center text-sm font-semibold text-gray-500 dark:text-gray-400">
          Don&apos;t have an account?
          <button className="ml-1 text-cyan-500 transition-colors hover:text-cyan-600">
            Get started with Tokenverse
          </button>
        </Text>
      </div>
    </div>
  )
}

export default SignIn
