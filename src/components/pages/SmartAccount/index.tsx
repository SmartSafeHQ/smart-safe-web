import { HTMLAttributes, ReactNode } from 'react'
import { clsx } from 'clsx'

interface SmartAccountTabRootProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

function SmartAccountTabRoot({
  children,
  className,
  ...props
}: SmartAccountTabRootProps) {
  return (
    <section
      className={clsx(
        'w-full h-full flex flex-col justify-start items-stretch gap-5 px-1 md:p-0',
        className
      )}
      {...props}
    >
      {children}
    </section>
  )
}

SmartAccountTabRoot.displayName = 'SmartAccountTab.Root'

interface SmartAccountTabHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

function SmartAccountTabHeader({
  children,
  className,
  ...props
}: SmartAccountTabHeaderProps) {
  return (
    <header className="w-full border-b-1 border-b-gray-400 dark:border-b-gray-700">
      <div
        className={clsx(
          'w-full pr-10 pb-8 pt-10 flex flex-col relative justify-start items-stretch gap-3 md:pr-4',
          className
        )}
        {...props}
      >
        {children}
      </div>
    </header>
  )
}

SmartAccountTabHeader.displayName = 'SmartAccountTab.Header'

interface SmartAccountTabTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode
}

function SmartAccountTabTitle({
  children,
  className,
  ...props
}: SmartAccountTabTitleProps) {
  return (
    <h1 className={clsx('text-2xl font-medium', className)} {...props}>
      {children}
    </h1>
  )
}

SmartAccountTabTitle.displayName = 'SmartAccountTab.Title'

interface SmartAccountTabDescriptionProps
  extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode
}

function SmartAccountTabDescription({
  children,
  className,
  ...props
}: SmartAccountTabDescriptionProps) {
  return (
    <p
      className={clsx(
        'text-sm leading-6 text-gray-500 dark:text-gray-400',
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
}

SmartAccountTabDescription.displayName = 'SmartAccountTab.Description'

export const SmartAccountTab = {
  Root: SmartAccountTabRoot,
  Header: SmartAccountTabHeader,
  Title: SmartAccountTabTitle,
  Description: SmartAccountTabDescription
}
