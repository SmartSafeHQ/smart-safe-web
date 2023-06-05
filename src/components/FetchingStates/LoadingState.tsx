import { Slot } from '@radix-ui/react-slot'
import clsx from 'clsx'
import { HTMLAttributes } from 'react'
import PuffLoader from 'react-spinners/PuffLoader'

import { Text } from '@components/Text'

interface LoadingStateProps extends HTMLAttributes<HTMLElement> {
  title: string
  asChild?: boolean
}

export function LoadingState({
  title,
  asChild,
  className,
  ...props
}: LoadingStateProps) {
  const Comp = asChild ? Slot : 'div'

  return (
    <Comp
      className={clsx(
        'w-full flex flex-col items-center justify-center gap-4',
        className
      )}
      {...props}
    >
      <PuffLoader
        size="4rem"
        aria-label="Loading Spinner"
        className="[&>*]:!border-zinc-800 dark:[&>*]:!border-zinc-50"
      />

      <Text
        asChild
        className="text-2xl font-medium text-zinc-800 dark:text-zinc-50"
      >
        <strong>{title}</strong>
      </Text>
    </Comp>
  )
}
