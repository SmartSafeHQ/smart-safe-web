import * as RadixHoverCard from '@radix-ui/react-hover-card'
import { ReactNode } from 'react'
import clsx from 'clsx'

interface HoverCardRootProps extends RadixHoverCard.HoverCardProps {
  children: ReactNode
}

function HoverCardRoot({
  children,
  openDelay = 0,
  closeDelay = 0,
  ...props
}: HoverCardRootProps) {
  return (
    <RadixHoverCard.Root
      openDelay={openDelay}
      closeDelay={closeDelay}
      {...props}
    >
      {children}
    </RadixHoverCard.Root>
  )
}

HoverCardRoot.displayName = 'HoverCard.Root'

interface HoverCardTriggerProps extends RadixHoverCard.HoverCardTriggerProps {
  children: ReactNode
}

function HoverCardTrigger({ children, ...props }: HoverCardTriggerProps) {
  return (
    <RadixHoverCard.Trigger asChild {...props}>
      {children}
    </RadixHoverCard.Trigger>
  )
}

HoverCardTrigger.displayName = 'HoverCard.Trigger'

interface HoverCardContentProps extends RadixHoverCard.HoverCardContentProps {
  children: ReactNode
  variant?: 'highlighted'
}

function HoverCardContent({
  children,
  variant,
  side = 'top',
  className,
  sideOffset = 5,
  ...props
}: HoverCardContentProps) {
  return (
    <RadixHoverCard.Portal>
      <RadixHoverCard.Content
        className={clsx(
          '[&>*]:fill-gray-50 [&>*]:dark:fill-gray-800 z-50 w-full flex flex-col justify-center items-center p-2 rounded-md bg-gray-50 dark:bg-gray-800 shadow-md animate-dialog-open',
          {
            'dark:bg-gray-900 [&>*]:dark:fill-gray-900':
              variant === 'highlighted'
          },
          className
        )}
        sideOffset={sideOffset}
        side={side}
        {...props}
      >
        {children}
      </RadixHoverCard.Content>
    </RadixHoverCard.Portal>
  )
}

HoverCardContent.displayName = 'HoverCard.Content'

type HoverCardArrowProps = RadixHoverCard.HoverCardArrowProps

function HoverCardArrow({ className, ...props }: HoverCardArrowProps) {
  return <RadixHoverCard.Arrow className={clsx(className)} {...props} />
}

HoverCardArrow.displayName = 'HoverCard.Arrow'

export const HoverCard = {
  Root: HoverCardRoot,
  Trigger: HoverCardTrigger,
  Content: HoverCardContent,
  Arrow: HoverCardArrow
}
