import { HTMLAttributes, ReactNode } from 'react'
import { clsx } from 'clsx'

interface SettingsTabRootProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

function SettingsTabRoot({
  children,
  className,
  ...props
}: SettingsTabRootProps) {
  return (
    <section
      className={clsx(
        'w-full h-full flex flex-col justify-start items-stretch gap-5 px-2 md:px-4',
        className
      )}
      {...props}
    >
      {children}
    </section>
  )
}

SettingsTabRoot.displayName = 'SettingsTab.Root'

interface SettingsTabHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

function SettingsTabHeader({
  children,
  className,
  ...props
}: SettingsTabHeaderProps) {
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

SettingsTabHeader.displayName = 'SettingsTab.Header'

interface SettingsTabTitleProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

function SettingsTabTitle({
  children,
  className,
  ...props
}: SettingsTabTitleProps) {
  return (
    <h1 className={clsx('text-2xl font-medium', className)} {...props}>
      {children}
    </h1>
  )
}

SettingsTabTitle.displayName = 'SettingsTab.Title'

interface SettingsTabDescriptionProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

function SettingsTabDescription({
  children,
  className,
  ...props
}: SettingsTabDescriptionProps) {
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

SettingsTabDescription.displayName = 'SettingsTab.Description'

export const SettingsTab = {
  Root: SettingsTabRoot,
  Header: SettingsTabHeader,
  Title: SettingsTabTitle,
  Description: SettingsTabDescription
}
