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
}

function TextInputRoot({
  children,
  error,
  className,
  ...props
}: TextInputRootProps) {
  return (
    <label
      className={clsx(
        'flex flex-col gap-2',
        {
          '[&>div:has(input)]:ring-2 [&>div:has(input)]:ring-red-500': !!error
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
        'flex items-center gap-3 min-h-[3rem] px-3 rounded w-full outline-none ring-cyan-500 bg-gray-200 dark:bg-gray-800 focus-within:ring-2',
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
    <Text className={clsx('font-semibold', className)} {...props}>
      {children}
    </Text>
  )
}

TextInputLabel.displayName = 'TextInput.Label'

export interface TextInputIconProps {
  children: ReactNode
}

function TextInputIcon({ children }: TextInputIconProps) {
  return <Slot className="w-6 h-6 text-gray-400">{children}</Slot>
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
        'flex flex-1 w-full h-full outline-none text-gray-800 dark:text-gray-100 text-sm bg-transparent placeholder:text-gray-400',
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
