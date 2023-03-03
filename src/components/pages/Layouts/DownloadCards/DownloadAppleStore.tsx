import Link, { LinkProps } from 'next/link'
import { AnchorHTMLAttributes } from 'react'
import clsx from 'clsx'

import { Text } from '@components/Text'
import { AppleStore } from '@components/Logos/AppleStore'

import { TOKENVERSE_APPLE_STORE_LINK } from '@utils/global/constants/links'

interface DownloadAppleStoreProps
  extends AnchorHTMLAttributes<HTMLAnchorElement>,
    Omit<LinkProps, 'href'> {
  href?: string
  variant?: 'dark' | 'light'
}

export function DownloadAppleStore({
  className,
  href = TOKENVERSE_APPLE_STORE_LINK,
  variant = 'dark',
  ...props
}: DownloadAppleStoreProps) {
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
      <AppleStore
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
        <Text className="text-xs font-semibold">Download on the</Text>
        <Text asChild className="text-lg font-semibold sm:text-xl">
          <strong>App Store</strong>
        </Text>
      </div>
    </Link>
  )
}
