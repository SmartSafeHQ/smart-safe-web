import { HTMLAttributes, ReactNode } from 'react'
import { clsx } from 'clsx'

interface Enable2FASectionRootProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

function Enable2FASectionRoot({
  children,
  className,
  ...props
}: Enable2FASectionRootProps) {
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

Enable2FASectionRoot.displayName = 'Enable2FASection.Root'

interface Enable2FASectionTitleProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
}

function Enable2FASectionTitle({
  children,
  className,
  ...props
}: Enable2FASectionTitleProps) {
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

Enable2FASectionTitle.displayName = 'Enable2FASection.Title'

interface Enable2FASectionDescriptionProps
  extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode
}

function Enable2FASectionDescription({
  children,
  className,
  ...props
}: Enable2FASectionDescriptionProps) {
  return (
    <span
      className={clsx('text-gray-400 text-xs md:text-sm', className)}
      {...props}
    >
      {children}
    </span>
  )
}

Enable2FASectionDescription.displayName = 'Enable2FASection.Description'

export const Enable2FASection = {
  Root: Enable2FASectionRoot,
  Title: Enable2FASectionTitle,
  Description: Enable2FASectionDescription
}
