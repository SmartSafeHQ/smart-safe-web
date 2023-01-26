import clsx from 'clsx'
import { IconProps } from 'phosphor-react'
import {
  ButtonHTMLAttributes,
  ForwardRefExoticComponent,
  RefAttributes
} from 'react'

import { Text } from '@components/Text'

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  Icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>
}

export function ActionButton({
  title,
  Icon,
  className,
  ...props
}: ActionButtonProps) {
  return (
    <button
      className={clsx(
        'w-fit flex items-center flex-col gap-1 py-3 px-6 rounded-md capitalize bg-gray-200 dark:bg-gray-800 transition-colors hover:bg-gray-300 hover:dark:bg-gray-700',
        className
      )}
      {...props}
    >
      <Icon className="w-7 h-7 text-cyan-500" />

      <Text className="text-lg font-medium text-gray-800 dark:text-gray-50">
        {title}
      </Text>
    </button>
  )
}
