import Link, { LinkProps } from 'next/link'
import { AnchorHTMLAttributes } from 'react'
import clsx from 'clsx'

import { Text } from '@components/Text'
import { GooglePlay } from '@components/Logos/GooglePlay'

import { TOKENVERSE_PLAY_STORE_LINK } from '@utils/global/constants/links'

interface DownloadPlayStoreProps
  extends AnchorHTMLAttributes<HTMLAnchorElement>,
    Omit<LinkProps, 'href'> {
  href?: string
  variant?: 'dark' | 'light'
}

export function DownloadPlayStore({
  className,
  href = TOKENVERSE_PLAY_STORE_LINK,
  variant = 'dark',
  ...props
}: DownloadPlayStoreProps) {
  return (
    <Link
      target="_blank"
      className={clsx(
        'w-full flex items-center justify-center gap-2 rounded-lg',
        {
          'bg-gray-900': variant === 'dark',
          'bg-gray-50': variant === 'light'
        },
        className
      )}
      href={href}
      {...props}
    >
      <GooglePlay
        className={clsx('w-9 h-11', {
          'fill-gray-50': variant === 'dark',
          'fill-gray-900': variant === 'light'
        })}
      />

      <div
        className={clsx('flex flex-col items-start gap-0', {
          'text-gray-50': variant === 'dark',
          'text-gray-900': variant === 'light'
        })}
      >
        <Text className="text-xs font-semibold">Get it on</Text>
        <Text asChild className="text-lg font-semibold sm:text-xl">
          <strong>Google Play</strong>
        </Text>
      </div>
    </Link>
  )
}
