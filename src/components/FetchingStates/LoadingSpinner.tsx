import clsx from 'clsx'
import { SVGAttributes } from 'react'

interface LoadingSpinnerProps extends SVGAttributes<HTMLOrSVGElement> {
  variant?: 'default' | 'primary'
}

export function LoadingSpinner({
  variant = 'default',
  className,
  ...props
}: LoadingSpinnerProps) {
  return (
    <svg
      className={clsx(
        'animate-spin',
        {
          'text-zinc-800 dark:text-zinc-50': variant === 'default',
          'text-cyan-500': variant === 'primary'
        },
        className
      )}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  )
}
