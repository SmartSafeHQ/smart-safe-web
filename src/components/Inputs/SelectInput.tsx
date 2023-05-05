import {
  forwardRef,
  ForwardRefExoticComponent,
  ForwardRefRenderFunction,
  ReactNode,
  RefAttributes
} from 'react'
import { clsx } from 'clsx'
import { CaretDown, CaretUp, Check, IconProps } from 'phosphor-react'
import * as RadixSelect from '@radix-ui/react-select'

import { Text } from '@components/Text'

export interface SelectInputRootProps extends RadixSelect.SelectProps {
  children: ReactNode
  labelText?: string
  className?: string
  error?: string
}

const SelectInputRoot: ForwardRefRenderFunction<
  HTMLLabelElement,
  SelectInputRootProps
> = ({ children, labelText, error, className, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={clsx(
        'flex flex-col gap-2',
        {
          '[&>button]:!ring-2 [&>button]:!ring-red-500': !!error
        },
        className
      )}
    >
      {labelText && <Text className="font-semibold">{labelText}</Text>}

      <RadixSelect.Root {...props}>{children}</RadixSelect.Root>

      {error && <Text className="text-red-500">{error}</Text>}
    </label>
  )
}

SelectInputRoot.displayName = 'SelectInput.Root'

export interface SelectInputTriggerProps
  extends RadixSelect.SelectTriggerProps {
  children?: ReactNode
  SelectIcon?: ForwardRefExoticComponent<
    IconProps & RefAttributes<SVGSVGElement>
  >
}

function SelectInputTrigger({
  children,
  placeholder,
  SelectIcon = CaretDown,
  className,
  ...props
}: SelectInputTriggerProps) {
  return (
    <RadixSelect.Trigger
      className={clsx(
        'w-full gap-3 inline-flex items-center justify-between rounded px-4 text-sm outline-none ring-gray-900 dark:ring-gray-100 focus-within:ring-2 data-[placeholder]:text-gray-400',
        className
      )}
      {...props}
    >
      {children}

      <RadixSelect.Value placeholder={placeholder} />

      <RadixSelect.Icon>
        <SelectIcon className="w-5 h-5 " weight="bold" />
      </RadixSelect.Icon>
    </RadixSelect.Trigger>
  )
}

SelectInputTrigger.displayName = 'SelectInput.Trigger'

export interface SelectInputContentProps
  extends RadixSelect.SelectContentProps {
  children: ReactNode
  ScrollUpButton?: ForwardRefExoticComponent<
    IconProps & RefAttributes<SVGSVGElement>
  >
  ScrollDownButton?: ForwardRefExoticComponent<
    IconProps & RefAttributes<SVGSVGElement>
  >
}

function SelectInputContent({
  children,
  className,
  ScrollUpButton = CaretUp,
  ScrollDownButton = CaretDown,
  ...props
}: SelectInputContentProps) {
  return (
    <RadixSelect.Portal className="z-50">
      <RadixSelect.Content
        className={clsx('hidden rounded-md shadow-md', className)}
        {...props}
      >
        <RadixSelect.ScrollUpButton className="flex items-center justify-center h-7 text-cyan-500 cursor-default">
          <ScrollUpButton />
        </RadixSelect.ScrollUpButton>

        <RadixSelect.Viewport className="p-2">{children}</RadixSelect.Viewport>

        <RadixSelect.ScrollDownButton className="flex items-center justify-center h-7 text-cyan-500 cursor-default">
          <ScrollDownButton />
        </RadixSelect.ScrollDownButton>
      </RadixSelect.Content>
    </RadixSelect.Portal>
  )
}

SelectInputContent.displayName = 'SelectInput.Content'

export interface SelectInputGroupProps extends RadixSelect.SelectGroupProps {
  children: ReactNode
  labelText?: string
}

function SelectInputGroup({
  labelText,
  children,
  ...props
}: SelectInputGroupProps) {
  return (
    <RadixSelect.Group {...props}>
      {labelText && (
        <RadixSelect.Label className="px-7 text-sm font-semibold leading-7 text-gray-500 dark:text-gray-400">
          {labelText}
        </RadixSelect.Label>
      )}

      {children}
    </RadixSelect.Group>
  )
}

SelectInputGroup.displayName = 'SelectInput.Group'

const SelectInputItem: ForwardRefRenderFunction<
  HTMLInputElement,
  RadixSelect.SelectItemProps
> = ({ className, children, ...props }, ref) => {
  return (
    <RadixSelect.Item
      ref={ref}
      className={clsx(
        className,
        'min-h-[2rem] pr-9 pl-7 flex items-center relative select-none text-sm font-medium text-gray-800 dark:text-gray-300 rounded data-[disabled]:text-gray-100 data-[disabled]:pointer-events-none data-[highlighted]:outline-none group'
      )}
      {...props}
    >
      <RadixSelect.ItemText asChild>{children}</RadixSelect.ItemText>

      <RadixSelect.ItemIndicator className="w-7 inline-flex items-center justify-center absolute left-0 text-brand-foregroundAccent1 font-medium group-data-[highlighted]:text-gray-100">
        <Check weight="bold" />
      </RadixSelect.ItemIndicator>
    </RadixSelect.Item>
  )
}

SelectInputItem.displayName = 'SelectInput.Item'

export const SelectInput = {
  Root: forwardRef(SelectInputRoot),
  Trigger: SelectInputTrigger,
  Content: SelectInputContent,
  Group: SelectInputGroup,
  Item: forwardRef(SelectInputItem)
}
