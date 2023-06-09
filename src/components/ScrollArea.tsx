import { ReactNode } from 'react'
import * as RadixScrollArea from '@radix-ui/react-scroll-area'
import clsx from 'clsx'

export interface ScrollAreaProps extends RadixScrollArea.ScrollAreaProps {
  children: ReactNode
  rootClassName?: string
}

export function ScrollArea({
  children,
  rootClassName,
  className,
  ...props
}: ScrollAreaProps) {
  return (
    <RadixScrollArea.Root
      className={clsx('w-full overflow-hidden', rootClassName)}
      {...props}
    >
      <RadixScrollArea.Viewport
        className={clsx(
          'w-full h-full flex flex-1 [&>div]:!block px-[0.1rem] pt-[0.1rem]',
          className
        )}
      >
        {children}
      </RadixScrollArea.Viewport>

      <RadixScrollArea.Scrollbar
        className="flex select-none touch-none bg-zinc-300 dark:bg-zinc-800 dark:brightness-150 rounded-md data-[orientation=vertical]:w-1 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-1"
        orientation="vertical"
      >
        <RadixScrollArea.Thumb className="flex-1 bg-zinc-400 dark:bg-zinc-700 rounded-xl relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[2.75rem] before:min-h-[2.75rem]" />
      </RadixScrollArea.Scrollbar>

      <RadixScrollArea.Scrollbar
        className="flex select-none touch-none bg-zinc-300 dark:bg-zinc-800 dark:brightness-150 rounded-md data-[orientation=vertical]:w-1 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-1"
        orientation="horizontal"
      >
        <RadixScrollArea.Thumb className="flex-1 bg-zinc-400 dark:bg-zinc-600 dark:brightness-50 rounded-xl relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[2.75rem] before:min-h-[2.75rem]" />
      </RadixScrollArea.Scrollbar>

      <RadixScrollArea.Corner className="bg-zinc-500 dark:bg-zinc-800" />
    </RadixScrollArea.Root>
  )
}
