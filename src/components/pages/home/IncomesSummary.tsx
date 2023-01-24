import clsx from 'clsx'
import { HTMLAttributes, ReactNode } from 'react'

import { Text } from '@components/Text'

interface IncomesSummaryRootProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function IncomesSummaryRoot({
  children,
  className,
  ...props
}: IncomesSummaryRootProps) {
  return (
    <div
      className={clsx(
        'w-full flex items-end justify-start gap-5 mb-7',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

IncomesSummaryRoot.displayName = 'IncomesSummary.Root'

interface IncomesSummaryItemProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function IncomesSummaryItem({
  children,
  className,
  ...props
}: IncomesSummaryItemProps) {
  return (
    <div className={clsx('flex flex-col items-start', className)} {...props}>
      {children}
    </div>
  )
}

IncomesSummaryItem.displayName = 'IncomesSummary.Item'

interface IncomesSummaryTitleProps
  extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode
}

export function IncomesSummaryTitle({
  children,
  className,
  ...props
}: IncomesSummaryTitleProps) {
  return (
    <Text
      asChild
      className={clsx(
        'flex items-center gap-1 font-medium text-gray-400 capitalize',
        className
      )}
    >
      <strong {...props}>{children}</strong>
    </Text>
  )
}

IncomesSummaryTitle.displayName = 'IncomesSummary.Title'

interface IncomesSummaryValueProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode
}

export function IncomesSummaryValue({
  children,
  className,
  ...props
}: IncomesSummaryValueProps) {
  return (
    <Text
      className={clsx('font-bold text-gray-50 capitalize', className)}
      {...props}
    >
      {children}
    </Text>
  )
}

IncomesSummaryValue.displayName = 'IncomesSummary.Value'

export const IncomesSummary = {
  Root: IncomesSummaryRoot,
  Item: IncomesSummaryItem,
  Title: IncomesSummaryTitle,
  Value: IncomesSummaryValue
}
