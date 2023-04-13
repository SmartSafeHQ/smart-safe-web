import { CaretLeft } from 'phosphor-react'
import Link, { LinkProps } from 'next/link'

import { Text } from '@components/Text'

import { useI18n } from '@hooks/useI18n'

type BackLinkProps = LinkProps

export function BackLink({ ...props }: BackLinkProps) {
  const { t } = useI18n()

  return (
    <Link
      className="flex justify-center items-center gap-2 px-3 py-2 rounded-md font-medium capitalize transition-colors hover:bg-gray-200 hover:dark:bg-gray-800"
      {...props}
    >
      <CaretLeft className="w-5 h-5" weight="bold" />

      <Text>{t.buyStableCoin.back}</Text>
    </Link>
  )
}
