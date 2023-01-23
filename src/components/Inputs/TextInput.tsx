import {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode
} from 'react'
import { clsx } from 'clsx'
import { Slot } from '@radix-ui/react-slot'

import { Text } from '@components/Text'

export interface TextInputRootProps
  extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode
  labelText?: string
  error?: string
  inputClassName?: string
}

function TextInputRoot({
  children,
  labelText,
  error,
  className,
  inputClassName = 'bg-gray-800',
  ...props
}: TextInputRootProps) {
  return (
    <label className={clsx('flex flex-col gap-2', className)} {...props}>
      {labelText && <Text className="font-semibold">{labelText}</Text>}

      <div
        className={clsx(
          'flex items-center gap-3 h-12 px-3 rounded w-full outline-none focus-within:ring-2',

          {
            'ring-2 ring-red-500': !!error
          },
          inputClassName
        )}
      >
        {children}
      </div>

      {error && <Text className="text-red-500">{error}</Text>}
    </label>
  )
}

TextInputRoot.displayName = 'TextInput.Root'

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
        'flex flex-1 h-full outline-none text-gray-100 text-sm bg-transparent placeholder:text-gray-400',
        className
      )}
      {...props}
    />
  )
}

TextInputInput.displayName = 'TextInput.Input'

export const TextInput = {
  Root: TextInputRoot,
  Input: forwardRef(TextInputInput),
  Icon: TextInputIcon
}
