import {
  ForwardRefExoticComponent,
  HTMLAttributes,
  ReactNode,
  RefAttributes
} from 'react'
import { IconProps } from 'phosphor-react'
import { Text } from '@/components/Text'
import clsx from 'clsx'

interface WalletInfosProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  Icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>
  children: ReactNode
  variant?: 'highlighted'
}

export function WalletInfos({
  title,
  Icon,
  className,
  variant,
  children,
  ...props
}: WalletInfosProps) {
  return (
    <div
      className={clsx(
        'w-full flex gap-4 items-center justify-between rounded-md bg-gray-50 dark:bg-gray-800 shadow-md',
        {
          '!bg-gray-200 dark:!bg-gray-700': variant === 'highlighted'
        },
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-3">
        <Icon className="w-7 h-7 text-brand-foregroundAccent1" />

        <Text className="text-base font-semibold capitalize text-gray-700 dark:text-gray-50 sm:text-lg">
          {title}
        </Text>
      </div>

      <div className="flex flex-wrap flex-col text-right gap-1 capitalize">
        {children}
      </div>
    </div>
  )
}
