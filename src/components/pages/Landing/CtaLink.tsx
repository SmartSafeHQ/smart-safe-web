import { CaretRight } from 'phosphor-react'
import Link from 'next/link'
import clsx from 'clsx'

import { Text } from '@components/Text'

interface CtaLinkProps {
  title: string
  href: string
  className?: string
}

export function CtaLink({ title, href, className }: CtaLinkProps) {
  return (
    <Text
      asChild
      className={clsx(
        'flex items-center gap-2 text-xl capitalize font-medium transition-colors text-sky-600 hover:text-sky-500',
        className
      )}
    >
      <Link href={href}>
        <Text>{title}</Text>

        <CaretRight className="w-6 h-6" weight="bold" />
      </Link>
    </Text>
  )
}
