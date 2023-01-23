import { ReactNode } from 'react'
import { clsx } from 'clsx'
import { Slot } from '@radix-ui/react-slot'

export interface TextProps {
  children: ReactNode
  asChild?: boolean
  className?: string
}

export function Text({ asChild, children, className }: TextProps) {
  const Comp = asChild ? Slot : 'span'

  return <Comp className={clsx('font-sans', className)}>{children}</Comp>
}
