import { HTMLAttributes, ReactNode } from 'react'
import { clsx } from 'clsx'

interface Security2FASectionRootProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

function Security2FASectionRoot({
  children,
  className,
  ...props
}: Security2FASectionRootProps) {
  return (
    <div
      className={clsx(
        'w-full flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-14',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

Security2FASectionRoot.displayName = 'Security2FASection.Root'

interface Security2FASectionTitleProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
}

function Security2FASectionTitle({
  children,
  className,
  ...props
}: Security2FASectionTitleProps) {
  return (
    <strong
      className={clsx(
        'w-full font-semibold text-start md:max-w-[7rem]',
        className
      )}
      {...props}
    >
      {children}
    </strong>
  )
}

Security2FASectionTitle.displayName = 'Security2FASection.Title'

interface Security2FASectionDescriptionProps
  extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode
}

function Security2FASectionDescription({
  children,
  className,
  ...props
}: Security2FASectionDescriptionProps) {
  return (
    <span
      className={clsx('text-gray-400 text-xs md:text-sm', className)}
      {...props}
    >
      {children}
    </span>
  )
}

Security2FASectionDescription.displayName = 'Security2FASection.Description'

export const Security2FASection = {
  Root: Security2FASectionRoot,
  Title: Security2FASectionTitle,
  Description: Security2FASectionDescription
}
