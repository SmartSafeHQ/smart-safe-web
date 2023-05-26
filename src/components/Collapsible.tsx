import { ReactNode } from 'react'
import * as RadixCollapsible from '@radix-ui/react-collapsible'
import clsx from 'clsx'

export interface CollapsibleRootProps
  extends RadixCollapsible.CollapsibleProps {
  children: ReactNode
}

function CollapsibleRoot({
  children,
  className,
  ...props
}: CollapsibleRootProps) {
  return (
    <RadixCollapsible.Root
      className={clsx('w-full flex flex-col', className)}
      {...props}
    >
      {children}
    </RadixCollapsible.Root>
  )
}

CollapsibleRoot.displayName = 'RadixCollapsible.Root'

export interface CollapsibleTriggerProps
  extends RadixCollapsible.CollapsibleTriggerProps {
  children: ReactNode
}

function CollapsibleTrigger({ children, ...props }: CollapsibleTriggerProps) {
  return (
    <RadixCollapsible.Trigger {...props}>{children}</RadixCollapsible.Trigger>
  )
}

CollapsibleTrigger.displayName = 'RadixCollapsible.Trigger'

export interface CollapsibleContentProps
  extends RadixCollapsible.CollapsibleContentProps {
  children: ReactNode
}

function CollapsibleContent({ children, ...props }: CollapsibleContentProps) {
  return (
    <RadixCollapsible.Content {...props}>{children}</RadixCollapsible.Content>
  )
}

CollapsibleContent.displayName = 'RadixCollapsible.Content'

export const Collapsible = {
  Root: CollapsibleRoot,
  Trigger: CollapsibleTrigger,
  Content: CollapsibleContent
}
