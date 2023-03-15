import { DeviceMobileCamera, IconProps } from 'phosphor-react'
import { UseFormRegister } from 'react-hook-form'
import {
  ForwardRefExoticComponent,
  HTMLAttributes,
  ReactNode,
  RefAttributes
} from 'react'
import clsx from 'clsx'

import { DialogModal } from '@components/Dialogs/DialogModal'
import { TextInput } from '@components/Inputs/TextInput'
import { Text } from '@components/Text'

export interface Verify2FAModalRootProps extends HTMLAttributes<HTMLElement> {
  title: string
  description: string
  children: ReactNode
  titleClassName?: string
  descriptionClassName?: string
}

function Verify2FAModalRoot({
  title,
  description,
  children,
  titleClassName,
  descriptionClassName,
  className,
  ...props
}: Verify2FAModalRootProps) {
  return (
    <DialogModal.Content className="md:max-w-[36rem]">
      <header
        className={clsx(
          'text-left w-full flex items-start flex-col gap-3 mb-9 pt-6',
          className
        )}
        {...props}
      >
        <DialogModal.Title
          className={clsx(
            'text-2xl font-bold text-gray-800 dark:text-gray-50',
            titleClassName
          )}
        >
          {title}
        </DialogModal.Title>

        <DialogModal.Description
          className={clsx(
            'text-gray-700 dark:text-gray-300',
            descriptionClassName
          )}
        >
          {description}
        </DialogModal.Description>
      </header>

      {children}

      <DialogModal.IconClose />
    </DialogModal.Content>
  )
}

Verify2FAModalRoot.displayName = 'Verify2FAModal.Root'

export interface Verify2FAModalContentProps
  extends HTMLAttributes<HTMLElement> {
  inputLabel: string
  inputPlaceholder: string
  onSubmit: () => Promise<void>
  register: UseFormRegister<{ code: string }>
  children: ReactNode
  error?: string
}

function Verify2FAModalContent({
  inputLabel,
  inputPlaceholder,
  onSubmit,
  register,
  children,
  error,
  className,
  ...props
}: Verify2FAModalContentProps) {
  return (
    <section
      className={clsx('w-full flex flex-col gap-4 items-stretch', className)}
      {...props}
    >
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-4 items-stretch w-full"
      >
        <TextInput.Root htmlFor="code" error={error} variant="secondary">
          <TextInput.Label className="text-gray-800 dark:text-gray-50">
            {inputLabel}
          </TextInput.Label>

          <TextInput.Content>
            <TextInput.Input
              {...register('code')}
              required
              type="number"
              min={0}
              id="code"
              placeholder={inputPlaceholder}
            />
          </TextInput.Content>
        </TextInput.Root>

        {children}
      </form>
    </section>
  )
}

Verify2FAModalContent.displayName = 'Verify2FAModal.Content'

export interface Verify2FAModalInfoProps extends HTMLAttributes<HTMLElement> {
  info: string
  iconClassName?: string
  infoClassName?: string
  Icon?: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>
}

function Verify2FAModalInfo({
  Icon = DeviceMobileCamera,
  info,
  iconClassName,
  infoClassName,
  className,
  ...props
}: Verify2FAModalInfoProps) {
  return (
    <div
      className={clsx('w-full flex items-start gap-2', className)}
      {...props}
    >
      <Icon className={clsx(iconClassName)} />

      <Text className={clsx('text-sm', infoClassName)}>{info}</Text>
    </div>
  )
}

Verify2FAModalInfo.displayName = 'Verify2FAModal.Info'

export interface Verify2FAModalFooterProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
}

function Verify2FAModalFooter({
  children,
  className,
  ...props
}: Verify2FAModalFooterProps) {
  return (
    <div
      className={clsx('w-full flex items-center gap-4 mt-2', className)}
      {...props}
    >
      {children}
    </div>
  )
}

Verify2FAModalFooter.displayName = 'Verify2FAModal.Footer'

export const Verify2FAModal = {
  Root: Verify2FAModalRoot,
  Content: Verify2FAModalContent,
  Info: Verify2FAModalInfo,
  Footer: Verify2FAModalFooter
}
