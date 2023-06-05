import { HTMLAttributes, ReactNode } from 'react'
import { clsx } from 'clsx'

import { Text } from '@components/Text'

interface PageLayoutRootProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

function PageLayoutRoot({
  children,
  className,
  ...props
}: PageLayoutRootProps) {
  return (
    <section
      className={clsx(
        'w-full h-full flex flex-col justify-start items-stretch',
        className
      )}
      {...props}
    >
      {children}
    </section>
  )
}

PageLayoutRoot.displayName = 'PageLayout.Root'

interface PageLayoutHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

function PageLayoutHeader({
  children,
  className,
  ...props
}: PageLayoutHeaderProps) {
  return (
    <header className="w-full min-h-[7.5rem] border-b-1 border-b-zinc-300 dark:border-b-zinc-700">
      <div
        className={clsx('w-full flex flex-col relative', className)}
        {...props}
      >
        {children}
      </div>
    </header>
  )
}

PageLayoutHeader.displayName = 'PageLayout.Header'

interface PageLayoutTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode
}

function PageLayoutTitle({
  children,
  className,
  ...props
}: PageLayoutTitleProps) {
  return (
    <h1 className={clsx('text-3xl font-medium', className)} {...props}>
      {children}
    </h1>
  )
}

PageLayoutTitle.displayName = 'PageLayout.Title'

interface PageLayoutDescriptionProps
  extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode
}

function PageLayoutDescription({
  children,
  className,
  ...props
}: PageLayoutDescriptionProps) {
  return (
    <Text
      className={clsx(
        'text-sm leading-7 text-zinc-500 font-medium text-start break-words',
        className
      )}
      {...props}
    >
      {children}
    </Text>
  )
}

PageLayoutDescription.displayName = 'PageLayout.Description'

export const PageLayout = {
  Root: PageLayoutRoot,
  Header: PageLayoutHeader,
  Title: PageLayoutTitle,
  Description: PageLayoutDescription
}
