import { ReactNode, ThHTMLAttributes } from 'react'
import clsx from 'clsx'

interface TransactionsTableThProps
  extends ThHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode
}

export function TransactionsTableTh({
  children,
  className,
  ...props
}: TransactionsTableThProps) {
  return (
    <th
      className={clsx(
        'pb-2 whitespace-nowrap text-start font-semibold text-xs md:text-sm',
        className
      )}
      {...props}
    >
      {children}
    </th>
  )
}

TransactionsTableTh.displayName = 'TransactionsTable.Th'
