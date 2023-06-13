import * as RadixDialog from '@radix-ui/react-dialog'
import clsx from 'clsx'
import { IconProps, X } from '@phosphor-icons/react'
import {
  ForwardRefExoticComponent,
  HTMLAttributes,
  HtmlHTMLAttributes,
  ReactNode,
  RefAttributes
} from 'react'

import { ScrollArea } from '@components/ScrollArea'

interface DialogModalRootProps extends RadixDialog.DialogProps {
  children: ReactNode
}

function DialogModalRoot({ children, ...props }: DialogModalRootProps) {
  return <RadixDialog.Root {...props}>{children}</RadixDialog.Root>
}

interface DialogModalTriggerProps {
  children: ReactNode
}

function DialogModalTrigger({ children }: DialogModalTriggerProps) {
  return <RadixDialog.Trigger asChild>{children}</RadixDialog.Trigger>
}

interface DialogModalTitleProps extends HtmlHTMLAttributes<HTMLHeadingElement> {
  children: ReactNode
}

function DialogModalTitle({
  children,
  className,
  ...props
}: DialogModalTitleProps) {
  return (
    <RadixDialog.Title
      asChild
      className={clsx('font-bold text-zinc-900 dark:text-zinc-50', className)}
    >
      <h1 {...props}>{children}</h1>
    </RadixDialog.Title>
  )
}

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
    <RadixDialog.Description
      asChild
      className={clsx('text-zinc-700 dark:text-zinc-300', className)}
    >
      <p className={className} {...props}>
        {children}
      </p>
    </RadixDialog.Description>
  )
}

interface DialogModalIconCloseProps {
  Icon?: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>
}

function DialogModalIconClose({ Icon = X }: DialogModalIconCloseProps) {
  return (
    <RadixDialog.Close
      asChild
      className="flex items-center justify-center p-2 absolute top-4 right-6 text-zinc-900 dark:text-zinc-100 text-2xl bg-transparent rounded-md hover:text-zinc-800 hover:bg-zinc-700/10 hover:dark:text-zinc-50 hover:dark:bg-zinc-300/10 transition-colors"
    >
      <button aria-label="Close">
        <Icon weight="bold" />
      </button>
    </RadixDialog.Close>
  )
}

interface DialogModalCloseProps {
  children: ReactNode
}

function DialogModalClose({ children }: DialogModalCloseProps) {
  return <RadixDialog.Close asChild>{children}</RadixDialog.Close>
}

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
            'w-full h-full max-w-full relative bg-zinc-100 dark:bg-zinc-900 shadow-lg animate-dialog-open border-1 border-zinc-200 dark:border-zinc-700 md:rounded-lg md:h-max',
            className
          )}
          {...props}
        >
          <ScrollArea
            rootClassName="!static"
            className="w-full max-h-screen flex flex-col items-stretch overflow-x-hidden md:max-h-[90vh]"
          >
            <div className="z-10 absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-zinc-50 dark:from-zinc-950 from-30% via-transparent via-80% to-transparent rounded-t-lg pointer-events-none" />

            {children}
          </ScrollArea>
        </RadixDialog.Content>
      </div>
    </RadixDialog.Portal>
  )
}

export interface DialogModalHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

function DialogModalHeader({
  className,
  children,
  ...props
}: DialogModalHeaderProps) {
  return (
    <header
      className={clsx(
        'flex items-center flex-col p-8 rounded-t-lg bg-white dark:bg-black border-b-1 border-zinc-200 dark:border-zinc-700',
        className
      )}
      {...props}
    >
      {children}
    </header>
  )
}

export interface DialogModalFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

function DialogModalFooter({
  className,
  children,
  ...props
}: DialogModalFooterProps) {
  return (
    <div className="py-10">
      <div
        className={clsx(
          'absolute bottom-0 left-0 w-full p-4 flex justify-between items-center rounded-b-lg bg-white dark:bg-zinc-950 border-t-1 border-zinc-200 dark:border-zinc-700',
          className
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  )
}

export const DialogModal = {
  Root: DialogModalRoot,
  Trigger: DialogModalTrigger,
  Title: DialogModalTitle,
  Description: DialogModalDescription,
  Close: DialogModalClose,
  IconClose: DialogModalIconClose,
  Content: DialogModalContent,
  Header: DialogModalHeader,
  Footer: DialogModalFooter
}
