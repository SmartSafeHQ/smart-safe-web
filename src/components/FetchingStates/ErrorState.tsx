import { Slot } from '@radix-ui/react-slot'
import clsx from 'clsx'
import { HTMLAttributes } from 'react'

import { SmartSafeIconLogo } from '@components/Logos/SmartSafeIconLogo'
import { Text } from '@components/Text'

interface ErrorStateProps extends HTMLAttributes<HTMLElement> {
  title: string
  description?: string
  asChild?: boolean
}

export function ErrorState({
  title,
  description,
  asChild,
  className,
  ...props
}: ErrorStateProps) {
  const Comp = asChild ? Slot : 'div'

  return (
    <Comp
      className={clsx(
        'w-full flex flex-col items-center justify-center gap-4',
        className
      )}
      {...props}
    >
      <SmartSafeIconLogo className="w-20 h-20 opacity-60" />

      <div className="max-w-lg flex flex-col items-center gap-1 text-center">
        <Text
          asChild
          className="text-lg font-medium  text-zinc-800 dark:text-zinc-400"
        >
          <strong>{title}</strong>
        </Text>

        {description && (
          <Text asChild className="text-md font-medium text-zinc-500">
            {description}
          </Text>
        )}
      </div>
    </Comp>
  )
}
