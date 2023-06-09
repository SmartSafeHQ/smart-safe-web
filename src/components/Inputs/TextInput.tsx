import {
  forwardRef,
  ForwardRefRenderFunction,
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode
} from 'react'
import { clsx } from 'clsx'
import { Slot } from '@radix-ui/react-slot'

import { Text, TextProps } from '@components/Text'

export interface TextInputRootProps
  extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode
  error?: string
  variant?: 'secondary'
}

function TextInputRoot({
  children,
  error,
  variant,
  className,
  ...props
}: TextInputRootProps) {
  return (
    <label
      className={clsx(
        'flex flex-col gap-2 [&>div:has(input)]:bg-white [&>div:has(input)]:dark:bg-black',
        {
          '[&>div:has(input)]:ring-2 [&>div:has(input)]:ring-red-500': !!error,
          '[&>div:has(input)]:!bg-zinc-100 [&>div:has(input)]:dark:!bg-zinc-900':
            variant === 'secondary'
        },
        className
      )}
      {...props}
    >
      {children}

      {error && <Text className="text-red-500">{error}</Text>}
    </label>
  )
}

TextInputRoot.displayName = 'TextInput.Root'

export interface TextInputContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

function TextInputContent({
  children,
  className,
  ...props
}: TextInputContentProps) {
  return (
    <div
      className={clsx(
        'flex items-center gap-x-3 min-h-[2.5rem] px-3 rounded w-full outline-none ring-zinc-800 dark:ring-zinc-300 focus-within:ring-1 border-1 border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 hover:dark:border-zinc-600',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

TextInputContent.displayName = 'TextInput.Content'

export interface TextInputLabelProps extends TextProps {
  children: ReactNode
}

function TextInputLabel({
  children,
  className,
  ...props
}: TextInputLabelProps) {
  return (
    <Text
      className={clsx(
        'text-sm text-zinc-900 dark:text-zinc-100 font-medium',
        className
      )}
      {...props}
    >
      {children}
    </Text>
  )
}

TextInputLabel.displayName = 'TextInput.Label'

export interface TextInputIconProps {
  children: ReactNode
}

function TextInputIcon({ children }: TextInputIconProps) {
  return <Slot className="w-5 h-5 text-zinc-500">{children}</Slot>
}

TextInputIcon.displayName = 'TextInput.Icon'

export type TextInputInputProps = InputHTMLAttributes<HTMLInputElement>

const TextInputInput: ForwardRefRenderFunction<
  HTMLInputElement,
  TextInputInputProps
> = ({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={clsx(
        'flex flex-1 w-full h-full outline-none text-sm text-zinc-900 dark:text-zinc-100 bg-transparent placeholder:text-zinc-400',
        className
      )}
      {...props}
    />
  )
}

TextInputInput.displayName = 'TextInput.Input'

export const TextInput = {
  Root: TextInputRoot,
  Content: TextInputContent,
  Label: TextInputLabel,
  Input: forwardRef(TextInputInput),
  Icon: TextInputIcon
}
