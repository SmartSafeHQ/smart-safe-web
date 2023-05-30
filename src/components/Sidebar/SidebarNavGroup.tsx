import { HTMLAttributes, ReactNode } from 'react'
import { clsx } from 'clsx'

import { Text } from '@components/Text'

interface SidebarNavGroupRootProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

function SidebarNavGroupRoot({
  children,
  className,
  ...props
}: SidebarNavGroupRootProps) {
  return (
    <div
      className={clsx(
        'flex flex-1 flex-col items-stretch justify-start',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

SidebarNavGroupRoot.displayName = 'SidebarNavGroup.Root'

interface SidebarNavGroupTitleProps
  extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode
}

function SidebarNavGroupTitle({
  children,
  className,
  ...props
}: SidebarNavGroupTitleProps) {
  return (
    <Text
      className={clsx(
        'px-3 pt-1 pb-3 text-start font-normal text-sm md:max-lg:text-center',
        className
      )}
      {...props}
    >
      <strong>{children}</strong>
    </Text>
  )
}

SidebarNavGroupTitle.displayName = 'SidebarNavGroup.Title'

export const SidebarNavGroup = {
  Root: SidebarNavGroupRoot,
  Title: SidebarNavGroupTitle
}
