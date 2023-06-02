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
  variant?: 'primary' | 'red' | 'green' | 'ghost'
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
        'flex items-center justify-center py-3 px-4 rounded font-semibold text-sm transition-colors focus:ring-2 ring-zinc-900 dark:ring-zinc-100 disabled:cursor-not-allowed',
        {
          'bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-700':
            variant === 'primary',
          'text-zinc-500 dark:text-zinc-400 bg-white dark:bg-black border-1 border-zinc-300 dark:border-zinc-700 hover:text-zinc-800 hover:border-zinc-900 hover:dark:text-zinc-100 hover:dark:border-zinc-100 min-w-[6.5rem] disabled:text-zinc-500 disabled:border-zinc-300 disabled:dark:text-zinc-400 disabled:dark:border-zinc-700':
            variant === 'ghost',
          'bg-red-500 text-zinc-50 hover:bg-red-600 disabled:bg-red-700':
            variant === 'red',
          'bg-green-500 text-zinc-50 hover:bg-green-600 disabled:bg-green-700':
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
