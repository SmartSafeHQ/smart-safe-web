import {
  forwardRef,
  ForwardRefExoticComponent,
  ForwardRefRenderFunction,
  ReactNode,
  RefAttributes
} from 'react'
import { clsx } from 'clsx'
import { CaretDown, CaretUp, Check, IconProps } from '@phosphor-icons/react'
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
        'w-full gap-3 inline-flex items-center justify-between px-3 overflow-hidden rounded-md bg-white dark:bg-black capitalize border-1 border-zinc-200 dark:border-zinc-700 ring-zinc-900 dark:ring-zinc-100 focus-within:ring-2 data-[placeholder]:text-zinc-400 hover:border-zinc-300 hover:dark:border-zinc-600',
        className
      )}
      {...props}
    >
      {children}

      <RadixSelect.Value placeholder={placeholder} />

      <RadixSelect.Icon>
        <SelectIcon className="w-4 h-4 text-zinc-400" weight="bold" />
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
        className={clsx(
          'overflow-hidden hidden rounded-md shadow-md border-1 bg-white dark:bg-black border-zinc-200 dark:border-zinc-700',
          className
        )}
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
        <RadixSelect.Label className="px-7 text-sm font-semibold leading-7 text-zinc-500 dark:text-zinc-400">
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
        'min-h-[2rem] pr-9 pl-7 flex items-center relative select-none text-sm font-medium overflow-hidden text-zinc-800 dark:text-zinc-300 rounded-md data-[disabled]:text-zinc-100 pointer data-[highlighted]:bg-zinc-200 data-[highlighted]:dark:bg-zinc-800 data-[disabled]:pointer-events-none data-[highlighted]:outline-none group'
      )}
      {...props}
    >
      <RadixSelect.ItemText asChild>{children}</RadixSelect.ItemText>

      <RadixSelect.ItemIndicator className="w-7 inline-flex items-center justify-center absolute left-0 text-cyan-500 font-medium">
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
