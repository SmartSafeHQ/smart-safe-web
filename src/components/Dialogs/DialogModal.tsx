import * as RadixDialog from '@radix-ui/react-dialog'
import clsx from 'clsx'
import { IconProps, X } from '@phosphor-icons/react'
import {
  ForwardRefExoticComponent,
  HtmlHTMLAttributes,
  ReactNode,
  RefAttributes
} from 'react'

interface DialogModalRootProps extends RadixDialog.DialogProps {
  children: ReactNode
}

function DialogModalRoot({ children, ...props }: DialogModalRootProps) {
  return <RadixDialog.Root {...props}>{children}</RadixDialog.Root>
}

DialogModalRoot.displayName = 'DialogModal.Root'

interface DialogModalTriggerProps {
  children: ReactNode
}

function DialogModalTrigger({ children }: DialogModalTriggerProps) {
  return <RadixDialog.Trigger asChild>{children}</RadixDialog.Trigger>
}

DialogModalTrigger.displayName = 'DialogModal.Trigger'

interface DialogModalTitleProps extends HtmlHTMLAttributes<HTMLHeadingElement> {
  children: ReactNode
}

function DialogModalTitle({
  children,

  ...props
}: DialogModalTitleProps) {
  return (
    <RadixDialog.Title asChild>
      <h1 {...props}>{children}</h1>
    </RadixDialog.Title>
  )
}

DialogModalTitle.displayName = 'DialogModal.Title'

interface DialogModalDescriptionProps
  extends HtmlHTMLAttributes<HTMLParagraphElement> {
  children: ReactNode
}

function DialogModalDescription({
  children,
  className,
  ...props
}: DialogModalDescriptionProps) {
  return (
    <RadixDialog.Description asChild>
      <p className={className} {...props}>
        {children}
      </p>
    </RadixDialog.Description>
  )
}

DialogModalDescription.displayName = 'DialogModal.Description'

interface DialogModalIconCloseProps {
  Icon?: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>
}

function DialogModalIconClose({ Icon = X }: DialogModalIconCloseProps) {
  return (
    <RadixDialog.Close
      asChild
      className="flex items-center justify-center p-2 absolute top-4 right-6 text-zinc-900 dark:text-zinc-100 text-2xl bg-transparent rounded-md hover:text-zinc-800 hover:bg-zinc-700/10 hover:dark:text-zinc-50 hover:dark:bg-zinc-500/10 transition-colors"
    >
      <button aria-label="Close">
        <Icon weight="bold" />
      </button>
    </RadixDialog.Close>
  )
}

DialogModalIconClose.displayName = 'DialogModal.IconClose'

interface DialogModalCloseProps {
  children: ReactNode
}

function DialogModalClose({ children }: DialogModalCloseProps) {
  return <RadixDialog.Close asChild>{children}</RadixDialog.Close>
}

DialogModalClose.displayName = 'DialogModal.Close'

export interface DialogModalContentProps
  extends RadixDialog.DialogContentProps {
  children: ReactNode
}

function DialogModalContent({
  className,
  children,
  ...props
}: DialogModalContentProps) {
  return (
    <RadixDialog.Portal className="relative">
      <RadixDialog.Overlay className="fixed z-10 inset-0 bg-zinc-900 bg-opacity-50 animate-dialog-open" />

      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-10">
        <RadixDialog.Content
          className={clsx(
            'w-full h-full max-w-full relative bg-zinc-100 dark:bg-zinc-950 shadow-lg animate-dialog-open md:rounded-lg md:h-max',
            className
          )}
          {...props}
        >
          <div className="w-full h-full max-h-screen flex flex-col md:max-h-[90vh]">
            {children}
          </div>
        </RadixDialog.Content>
      </div>
    </RadixDialog.Portal>
  )
}

DialogModalContent.displayName = 'DialogModal.Content'

export const DialogModal = {
  Root: DialogModalRoot,
  Trigger: DialogModalTrigger,
  Title: DialogModalTitle,
  Description: DialogModalDescription,
  Close: DialogModalClose,
  IconClose: DialogModalIconClose,
  Content: DialogModalContent
}
