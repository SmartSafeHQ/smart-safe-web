import { ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react'
import { clsx } from 'clsx'
import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'
import { IconProps } from 'phosphor-react'
import { Slot } from '@radix-ui/react-slot'

export interface DropdownMenuRootProps
  extends RadixDropdownMenu.DropdownMenuProps {
  children: ReactNode
}

function DropdownMenuRoot({ children, ...props }: DropdownMenuRootProps) {
  return <RadixDropdownMenu.Root {...props}>{children}</RadixDropdownMenu.Root>
}

DropdownMenuRoot.displayName = 'RadixDropdownMenu.Root'

export interface DropdownMenuTriggerProps {
  children: ReactNode
}

function DropdownMenuTrigger({ children }: DropdownMenuTriggerProps) {
  return (
    <RadixDropdownMenu.Trigger asChild>{children}</RadixDropdownMenu.Trigger>
  )
}

DropdownMenuTrigger.displayName = 'RadixDropdownMenu.Trigger'

export interface DropdownMenuContentProps
  extends RadixDropdownMenu.MenuContentProps {
  children: ReactNode
}

function DropdownMenuContent({
  children,
  className,
  ...props
}: DropdownMenuContentProps) {
  return (
    <RadixDropdownMenu.Portal>
      <RadixDropdownMenu.Content
        className={clsx(
          'py-2 shadow-lg animate-dropdown-menu-open rounded-md bg-zinc-50 dark:bg-zinc-950 dark:border-1 dark:border-zinc-600 z-20',
          className
        )}
        sideOffset={5}
        {...props}
      >
        {children}
      </RadixDropdownMenu.Content>
    </RadixDropdownMenu.Portal>
  )
}

DropdownMenuContent.displayName = 'RadixDropdownMenu.Content'

export type DropdownMenuSeparatorProps = RadixDropdownMenu.MenuSeparatorProps

function DropdownMenuSeparator({
  className,
  ...props
}: DropdownMenuSeparatorProps) {
  return (
    <RadixDropdownMenu.Separator
      className={clsx(
        'h-[1px] bg-zinc-50 dark:bg-zinc-950 my-1 mx-3',
        className
      )}
      {...props}
    />
  )
}

DropdownMenuSeparator.displayName = 'RadixDropdownMenu.Separator'

export interface DropdownMenuItemProps extends RadixDropdownMenu.MenuItemProps {
  LeftIcon?: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>
  isDisabled?: boolean
  children: ReactNode
}

function DropdownMenuItem({
  children,
  LeftIcon,
  isDisabled = false,
  className,
  ...props
}: DropdownMenuItemProps) {
  return (
    <RadixDropdownMenu.Item
      className={clsx(
        'relative flex items-center justify-start gap-4 px-5 py-2 select-none outline-none text-base font-medium capitalize cursor-pointer',
        {
          'pointer-events-none text-zinc-400 dark:brightness-50 dark:text-zinc-50':
            isDisabled
        },
        className
      )}
      {...props}
    >
      {LeftIcon && (
        <Slot className="w-5 h-5">
          <LeftIcon weight="regular" />
        </Slot>
      )}

      {children}
    </RadixDropdownMenu.Item>
  )
}

DropdownMenuItem.displayName = 'RadixDropdownMenu.Item'

export const DropdownMenu = {
  Root: DropdownMenuRoot,
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Separator: DropdownMenuSeparator,
  Item: DropdownMenuItem
}
