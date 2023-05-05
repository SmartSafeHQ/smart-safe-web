import { ReactNode } from 'react'
import * as RadixNavigationMenu from '@radix-ui/react-navigation-menu'
import clsx from 'clsx'

export interface NavigationMenuRootProps
  extends RadixNavigationMenu.NavigationMenuProps {
  children: ReactNode
}

function NavigationMenuRoot({ children, ...props }: NavigationMenuRootProps) {
  return (
    <RadixNavigationMenu.Root
      className="relative flex justify-center w-full z-10 [&>div]:w-full"
      {...props}
    >
      {children}

      <div className="w-full h-full absolute top-full left-0 flex justify-center">
        <RadixNavigationMenu.Viewport className="w-full relative mt-[10px] bg-white dark:bg-black shadow-sm" />
      </div>
    </RadixNavigationMenu.Root>
  )
}

NavigationMenuRoot.displayName = 'NavigationMenu.Root'

export interface NavigationMenuListProps
  extends RadixNavigationMenu.NavigationMenuListProps {
  children: ReactNode
}

function NavigationMenuList({
  children,
  className,
  ...props
}: NavigationMenuListProps) {
  return (
    <RadixNavigationMenu.List
      className={clsx(
        'flex justify-center bg-white dark:bg-black rounded-md list-none shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </RadixNavigationMenu.List>
  )
}

NavigationMenuList.displayName = 'NavigationMenu.List'

export interface NavigationMenuItemProps
  extends RadixNavigationMenu.NavigationMenuItemProps {
  children: ReactNode
}

function NavigationMenuItem({ children, ...props }: NavigationMenuItemProps) {
  return (
    <RadixNavigationMenu.Item className="w-full" {...props}>
      {children}
    </RadixNavigationMenu.Item>
  )
}

NavigationMenuItem.displayName = 'NavigationMenu.Item'

function NavigationMenuIndicator() {
  return (
    <RadixNavigationMenu.Indicator className="h-[10px] top-full flex items-end justify-center overflow-hidden z-10">
      <div className="relative w-[10px] h-[10px] top-[70%] bg-white dark:bg-black rotate-[135deg] rounded-t-md" />
    </RadixNavigationMenu.Indicator>
  )
}

NavigationMenuIndicator.displayName = 'NavigationMenu.Indicator'

export interface NavigationMenuTriggerProps
  extends RadixNavigationMenu.NavigationMenuTriggerProps {
  children: ReactNode
}

function NavigationMenuTrigger({
  children,
  className,
  ...props
}: NavigationMenuTriggerProps) {
  return (
    <RadixNavigationMenu.Trigger
      className={clsx('w-full select-none', className)}
      onPointerMove={event => event.preventDefault()}
      onPointerLeave={event => event.preventDefault()}
      {...props}
    >
      {children}
    </RadixNavigationMenu.Trigger>
  )
}

NavigationMenuTrigger.displayName = 'NavigationMenu.Trigger'

export interface NavigationMenuContentProps
  extends RadixNavigationMenu.NavigationMenuContentProps {
  children: ReactNode
}

function NavigationMenuContent({
  children,
  ...props
}: NavigationMenuContentProps) {
  return (
    <RadixNavigationMenu.Content
      className="w-auto absolute top-0 left-0 bg-white dark:bg-black border-1 border-zinc-200 dark:border-zinc-700 rounded-md animate-dialog-open"
      onPointerEnter={event => event.preventDefault()}
      onPointerLeave={event => event.preventDefault()}
      {...props}
    >
      {children}
    </RadixNavigationMenu.Content>
  )
}

NavigationMenuContent.displayName = 'NavigationMenu.Content'

export const NavigationMenu = {
  Root: NavigationMenuRoot,
  List: NavigationMenuList,
  Item: NavigationMenuItem,
  Trigger: NavigationMenuTrigger,
  Indicator: NavigationMenuIndicator,
  Content: NavigationMenuContent
}
