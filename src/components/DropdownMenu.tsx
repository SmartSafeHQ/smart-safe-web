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
          'rounded-md shadow-md animate-dropdown-menu-open',
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
        'h-[1px] bg-zinc-300 dark:bg-zinc-700 my-1 mx-3',
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
        'relative flex items-center justify-start gap-4 select-none outline-none text-base font-medium capitalize cursor-pointer',
        {
          'pointer-events-none text-zinc-400 dark:brightness-50 dark:text-zinc-50':
            isDisabled
        },
        className
      )}
      {...props}
    >
      {LeftIcon && (
        <Slot className="w-5 h-5 text-cyan-500">
          <LeftIcon weight="fill" />
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
