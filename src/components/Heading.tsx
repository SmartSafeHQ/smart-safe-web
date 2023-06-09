import { ReactNode } from 'react'
import { clsx } from 'clsx'
import { Slot } from '@radix-ui/react-slot'

export interface HeadingProps {
  children: ReactNode
  asChild?: boolean
  className?: string
}

export function Heading({ asChild, children, className }: HeadingProps) {
  const Comp = asChild ? Slot : 'h2'

  return (
    <Comp className={clsx('font-sans font-bold', className)}>{children}</Comp>
  )
}
