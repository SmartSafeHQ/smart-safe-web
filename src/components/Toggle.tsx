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
        'border-2 border-transparent data-[state=on]:brightness-95 data-[state=on]:dark:brightness-90 data-[state=on]:border-brand-foregroundAccent1 transition-colors hover:border-brand-foregroundAccent2 focus:shadow-md',
        className
      )}
      aria-label="Toggle item"
      {...props}
    >
      {children}
    </RadixToggle.Root>
  )
}
