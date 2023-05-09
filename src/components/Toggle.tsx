import { ReactNode } from 'react'
import { clsx } from 'clsx'
import * as RadixToggle from '@radix-ui/react-toggle'

export interface ToggleProps extends RadixToggle.ToggleProps {
  children: ReactNode
}

export function Toggle({ children, className, ...props }: ToggleProps) {
  return (
    <RadixToggle.Root
      className={clsx(
        'border-2 border-transparent data-[state=on]:brightness-95 data-[state=on]:dark:brightness-90 data-[state=on]:border-cyan-500 transition-colors hover:border-cyan-600 focus:shadow-md',
        className
      )}
      aria-label="Toggle item"
      {...props}
    >
      {children}
    </RadixToggle.Root>
  )
}
