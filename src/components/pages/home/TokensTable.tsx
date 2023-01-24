import clsx from 'clsx'
import { HTMLAttributes, ReactNode, ThHTMLAttributes } from 'react'

interface TokensTableThProps extends ThHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode
}

export function TokensTableTh({
  children,
  className,
  ...props
}: TokensTableThProps) {
  return (
    <th
      className={clsx(
        'pb-2 whitespace-nowrap text-start font-semibold',
        className
      )}
      {...props}
    >
      {children}
    </th>
  )
}

TokensTableTh.displayName = 'TokensTable.Th'

interface TokensTableTrProps extends HTMLAttributes<HTMLTableRowElement> {
  name: string
  income: number
  price: number
  balance: number
}

export function TokensTableTr({
  name,
  income,
  balance,
  price,
  className,
  ...props
}: TokensTableTrProps) {
  return (
    <tr
      className={clsx(
        'text-gray-50 font-medium border-b-[0.5px] border-gray-600',
        className
      )}
      {...props}
    >
      <td className="py-3 font-bold uppercase">{name}</td>
      <td className="py-3 px-1">{income}%</td>
      <td className="py-3 px-1">{price}</td>
      <td className="py-3">{balance}</td>
    </tr>
  )
}

TokensTableTr.displayName = 'TokensTable.Tr'

export const TokensTable = {
  Th: TokensTableTh,
  Tr: TokensTableTr
}
