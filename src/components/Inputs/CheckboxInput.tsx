import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import clsx from 'clsx'
import { Check } from 'phosphor-react'

type CheckboxInputProps = CheckboxPrimitive.CheckboxProps

export function CheckboxInput({ className, ...props }: CheckboxInputProps) {
  return (
    <CheckboxPrimitive.Root
      className={clsx(
        'w-6 h-6 p-[2px] rounded bg-gray-200 dark:bg-gray-800',
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.CheckboxIndicator asChild>
        <Check weight="bold" className="h-5 w-5 text-brand-foregroundAccent1" />
      </CheckboxPrimitive.CheckboxIndicator>
    </CheckboxPrimitive.Root>
  )
}
