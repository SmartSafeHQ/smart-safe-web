import { ReactNode, ThHTMLAttributes } from 'react'
import clsx from 'clsx'

interface CoinsTableThProps extends ThHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode
}

export function CoinsTableTh({
  children,
  className,
  ...props
}: CoinsTableThProps) {
  return (
    <th
      className={clsx(
        'first:pl-4 px-2 pb-2 whitespace-nowrap text-start font-semibold text-xs md:text-sm md:px-0',
        className
      )}
      {...props}
    >
      {children}
    </th>
  )
}

CoinsTableTh.displayName = 'CoinsTable.Th'
