import Link from 'next/link'
import clsx from 'clsx'
import { TwitterLogo, User } from 'phosphor-react'

import { TokenverseTextLogo } from '@components/Logos/TokenverseTextLogo'
import { Text } from '@components/Text'

import { TOKENVERSE_TWITTER_LINK } from '@utils/global/constants/links'

export function Header() {
  return (
    <header
      className={clsx(
        'w-full h-20 absolute top-0 left-0 px-6 md:px-8 border-b-[1px] border-gray-700 bg-gray-900 shadow-xl'
      )}
    >
      <div className="w-full h-full flex justify-between items-center">
        <TokenverseTextLogo className="w-40 h-5 md:w-56 md:h-6" />

        <div className="flex gap-2 items-center">
          <Text
            asChild
            className="flex gap-2 items-center justify-center py-3 px-4 font-semibold text-gray-50 uppercase hover:text-gray-300 transition-colors"
          >
            <Link href="/accounts/login">
              <User className="text-lg text-cyan-500" weight="bold" />
              Sign in
            </Link>
          </Text>

          <a
            href={TOKENVERSE_TWITTER_LINK}
            target="_blank"
            className="p-2 rounded-full bg-transparent transition-colors hover:bg-gray-800"
            rel="noreferrer"
          >
            <TwitterLogo className="w-7 h-7 text-gray-50" weight="fill" />
          </a>
        </div>
      </div>
    </header>
  )
}
