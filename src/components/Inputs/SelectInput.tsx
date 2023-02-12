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
  placeholder?: string
  error?: string
  variant?: 'secondary'
  SelectIcon?: ForwardRefExoticComponent<
    IconProps & RefAttributes<SVGSVGElement>
  >
  ScrollUpButton?: ForwardRefExoticComponent<
    IconProps & RefAttributes<SVGSVGElement>
  >
  ScrollDownButton?: ForwardRefExoticComponent<
    IconProps & RefAttributes<SVGSVGElement>
  >
  inputClassName?: string
}

function SelectInputRoot({
  children,
  labelText,
  error,
  variant,
  SelectIcon = CaretDown,
  ScrollUpButton = CaretUp,
  ScrollDownButton = CaretDown,
  className,
  placeholder,
  inputClassName = 'bg-gray-800',
  ...props
}: SelectInputRootProps) {
  return (
    <label className={clsx('flex flex-col gap-2', className)}>
      {labelText && <Text className="font-semibold">{labelText}</Text>}

      <RadixSelect.Root {...props}>
        <RadixSelect.Trigger
          className={clsx(
            'w-full gap-3 min-h-[3rem] inline-flex items-center justify-between rounded px-4 text-sm shadow-sm dark:shadow-md outline-none ring-cyan-500 !bg-gray-200 dark:!bg-gray-800 focus-within:ring-2 data-[placeholder]:text-gray-400',
            {
              'ring-2 ring-red-500': !!error,
              '!bg-gray-50 dark:!bg-gray-900': variant === 'secondary'
            },
            inputClassName
          )}
        >
          <RadixSelect.Value placeholder={placeholder} />

          <RadixSelect.Icon>
            <SelectIcon
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              weight="bold"
            />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>

        <RadixSelect.Portal className="z-50">
          <RadixSelect.Content
            className={clsx(
              'hidden rounded-md shadow-md bg-gray-200 dark:bg-gray-800',
              {
                'bg-gray-50 dark:bg-gray-900': variant === 'secondary'
              }
            )}
          >
            <RadixSelect.ScrollUpButton className="flex items-center justify-center h-7 bg-gray-200 dark:bg-gray-800 text-cyan-500 cursor-default">
              <ScrollUpButton />
            </RadixSelect.ScrollUpButton>

            <RadixSelect.Viewport className="p-2">
              {children}
            </RadixSelect.Viewport>

            <RadixSelect.ScrollDownButton className="flex items-center justify-center h-7 bg-gray-200 dark:bg-gray-800 text-cyan-500 cursor-default">
              <ScrollDownButton />
            </RadixSelect.ScrollDownButton>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>

      {error && <Text className="text-red-500">{error}</Text>}
    </label>
  )
}

SelectInputRoot.displayName = 'SelectInput.Root'

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
        'min-h-[2rem] pr-9 pl-7 flex items-center relative select-none text-sm font-medium text-gray-800 dark:text-gray-300 rounded data-[disabled]:text-gray-100 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-cyan-600 data-[highlighted]:!text-gray-100 group'
      )}
      {...props}
    >
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>

      <RadixSelect.ItemIndicator className="w-7 inline-flex items-center justify-center absolute left-0 text-cyan-500 font-medium group-data-[highlighted]:text-gray-100">
        <Check weight="bold" />
      </RadixSelect.ItemIndicator>
    </RadixSelect.Item>
  )
}

SelectInputItem.displayName = 'SelectInput.Item'

export const SelectInput = {
  Root: SelectInputRoot,
  Group: SelectInputGroup,
  Item: forwardRef(SelectInputItem)
}
