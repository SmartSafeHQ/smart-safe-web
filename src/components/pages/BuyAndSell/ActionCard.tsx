import Link from 'next/link'
import { ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react'
import { ArrowRight, IconProps } from 'phosphor-react'
import clsx from 'clsx'

import { Text } from '@components/Text'

interface ActionCardProps {
  id: 'buy' | 'sell'
  href: string
  ctaTitle: string
  title: string
  Icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>
  children: ReactNode
}

export function ActionCard({
  id,
  href,
  ctaTitle,
  title,
  Icon,
  children
}: ActionCardProps) {
  return (
    <article className="w-full min-w-[25rem] flex flex-1 flex-col items-center gap-8 bg-gray-100 dark:bg-gray-800 pt-7 pb-10 px-8 rounded-md shadow-lg border-1 border-gray-200 dark:border-gray-800">
      <Text
        asChild
        className={clsx(
          'w-full flex items-center justify-center gap-4 p-3 capitalize text-lg font-bold text-gray-50 rounded-md transition-colors',
          {
            'bg-green-500 hover:bg-green-600': id === 'buy',
            'bg-red-500 hover:bg-red-600': id === 'sell'
          }
        )}
      >
        <Link href={href}>
          <Text>{ctaTitle}</Text>

          <ArrowRight className="w-6 h-6" weight="bold" />
        </Link>
      </Text>

      <div className="w-full flex flex-col items-start gap-8">
        <div className="w-full flex items-center justify-start gap-4">
          <div className="p-4 bg-gray-200 dark:bg-gray-700 rounded-full">
            <Icon
              className="text-[28px] text-brand-foregroundAccent1"
              weight="bold"
            />
          </div>

          <Text
            asChild
            className="text-2xl font-bold text-gray-800 dark:text-gray-100"
          >
            <strong>{title}</strong>
          </Text>
        </div>

        <ol className="flex flex-col text-lg gap-4 text-gray-500 dark:text-gray-300">
          {children}
        </ol>
      </div>
    </article>
  )
}
