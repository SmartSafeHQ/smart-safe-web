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
  variant?: 'primary' | 'red'
}

const ButtonComponent: ForwardRefRenderFunction<
  HTMLButtonElement,
  ButtonProps
> = (
  {
    children,
    isLoading = false,
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
      disabled={isLoading}
      className={clsx(
        'flex items-center justify-center py-3 px-4 rounded font-semibold text-sm transition-colors focus:ring-2 ring-gray-900 dark:ring-gray-100 disabled:cursor-not-allowed disabled:bg-brand-foregroundAccent2',
        {
          'cursor-not-allowed brightness-75': isLoading,
          'bg-brand-foregroundAccent1 text-brand-background hover:bg-brand-foregroundAccent2 disabled:hover:bg-brand-foregroundAccent2':
            variant === 'primary',
          'bg-red-500 text-gray-50 hover:bg-red-400 disabled:hover:bg-red-500':
            variant === 'red'
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
