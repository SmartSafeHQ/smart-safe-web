import clsx from 'clsx'
import { SVGAttributes } from 'react'

interface InWalletIconLogoProps extends SVGAttributes<HTMLOrSVGElement> {
  variant?: 'primary' | 'dark' | 'light'
}

export function InWalletIconLogo({
  variant = 'primary',
  ...props
}: InWalletIconLogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="88"
      fill="none"
      viewBox="0 0 100 88"
      {...props}
    >
      <path
        fill={clsx({
          '#C30C13': variant === 'primary',
          '#111827': variant === 'dark',
          '#e5e7eb': variant === 'light'
        })}
        d="M50.02 0c-.05-.01-11.304 2.82-25.03 6.27L.02 12.55l-.01 6.29L0 25.12l.18.05c.09.02 11.334 2.85 24.96 6.27 13.636 3.43 24.82 6.23 24.87 6.23.04 0 11.264-2.81 24.94-6.25 13.686-3.44 24.91-6.26 24.96-6.28l.08-.02V12.55L75.04 6.28C61.314 2.83 50.06 0 50.02 0zM100 37.52l-.11.03c-.06.01-11.304 2.84-25 6.28l-24.88 6.25-24.97-6.27C11.304 40.35.05 37.53.04 37.53H.03c-.01 0-.02 2.83-.01 6.28l.01 6.28 24.94 6.27c13.716 3.45 24.99 6.27 25.05 6.27.07 0 11.334-2.82 25.04-6.27l24.91-6.26.01-6.29.02-6.29zM0 62.48l.02 6.29.01 6.28 24.98 6.29L50 87.62l24.99-6.28 25-6.28V62.48l-.08.02c-.05.02-11.274 2.84-24.95 6.28-13.686 3.44-24.91 6.25-24.95 6.25-.04 0-11.273-2.81-24.96-6.25C11.364 65.34.13 62.52.09 62.5L0 62.48z"
      ></path>
    </svg>
  )
}
