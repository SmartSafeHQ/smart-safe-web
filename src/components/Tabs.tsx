import * as RadixTabs from '@radix-ui/react-tabs'
import { ReactNode } from 'react'
import clsx from 'clsx'

interface TabsRootProps extends RadixTabs.TabsProps {
  children: ReactNode
}

export function TabsRoot({ className, children, ...props }: TabsRootProps) {
  return (
    <RadixTabs.Root
      className={clsx('flex flex-col justify-center', className)}
      {...props}
    >
      {children}
    </RadixTabs.Root>
  )
}

TabsRoot.displayName = 'Tabs.Root'

interface TabsListProps extends RadixTabs.TabsListProps {
  children: ReactNode
}

export function TabsList({ className, children, ...props }: TabsListProps) {
  return (
    <RadixTabs.List
      className={clsx(
        'flex flex-shrink-0 border-b-1 border-b-gray-400 dark:border-b-gray-700',
        className
      )}
      {...props}
    >
      {children}
    </RadixTabs.List>
  )
}

TabsList.displayName = 'Tabs.List'

interface TabsTriggerProps extends RadixTabs.TabsTriggerProps {
  children: ReactNode
}

export function TabsTrigger({
  className,
  children,
  ...props
}: TabsTriggerProps) {
  return (
    <RadixTabs.Trigger
      className={clsx(
        'flex flex-1 items-center justify-center px-3 py-3 text-gray-500 capitalize font-medium ring-gray-900 dark:ring-gray-100 transition-all focus:ring-2 hover:text-gray-800 hover:dark:text-gray-50 hover:bg-brand-foregroundAccent1 hover:bg-opacity-5 data-[state=active]:border-b-1 data-[state=active]:border-b-brand-foregroundAccent1 data-[state=active]:text-gray-800 dark:data-[state=active]:text-gray-50 focus:relative focus:shadow-md disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-400',
        className
      )}
      {...props}
    >
      {children}
    </RadixTabs.Trigger>
  )
}

TabsTrigger.displayName = 'Tabs.Trigger'

interface TabsContentProps extends RadixTabs.TabsContentProps {
  children: ReactNode
}

export function TabsContent({
  className,
  children,
  ...props
}: TabsContentProps) {
  return (
    <RadixTabs.Content
      className={clsx('flex flex-grow outline-none', className)}
      {...props}
    >
      {children}
    </RadixTabs.Content>
  )
}

TabsContent.displayName = 'Tabs.Content'

export const Tabs = {
  Root: TabsRoot,
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent
}
