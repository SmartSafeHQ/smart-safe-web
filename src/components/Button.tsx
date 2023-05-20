import {
  ButtonHTMLAttributes,
  forwardRef,
  ForwardRefRenderFunction,
  ReactNode
} from 'react'
import { clsx } from 'clsx'
import { Slot } from '@radix-ui/react-slot'
import BounceLoader from 'react-spinners/BounceLoader'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  isLoading?: boolean
  asChild?: boolean
  variant?: 'primary' | 'red' | 'green'
}

const ButtonComponent: ForwardRefRenderFunction<
  HTMLButtonElement,
  ButtonProps
> = (
  {
    children,
    isLoading = false,
    disabled,
    asChild,
    className,
    variant = 'primary',
    ...props
  },
  ref
) => {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      ref={ref}
      disabled={isLoading || disabled}
      className={clsx(
        'flex items-center justify-center py-3 px-4 rounded font-semibold text-sm transition-colors focus:ring-2 ring-gray-900 dark:ring-gray-100 disabled:cursor-not-allowed disabled:brightness-75',
        {
          'bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-600':
            variant === 'primary',
          'bg-red-500 text-gray-50 hover:bg-red-600 disabled:bg-red-600':
            variant === 'red',
          'bg-green-500 text-gray-50 hover:bg-green-600 disabled:bg-green-600':
            variant === 'green'
        },
        className
      )}
      {...props}
    >
      {isLoading ? (
        <BounceLoader
          color="white"
          size="1.25rem"
          aria-label="Loading Spinner"
        />
      ) : (
        children
      )}
    </Comp>
  )
}

export const Button = forwardRef(ButtonComponent)
