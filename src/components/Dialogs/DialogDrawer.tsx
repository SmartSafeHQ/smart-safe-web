import { ScrollArea } from '@/components/ScrollArea'
import * as RadixDialog from '@radix-ui/react-dialog'
import clsx from 'clsx'
import { IconProps, X } from 'phosphor-react'
import {
  ForwardRefExoticComponent,
  HtmlHTMLAttributes,
  ReactNode,
  RefAttributes
} from 'react'

interface DialogDrawerRootProps extends RadixDialog.DialogProps {
  children: ReactNode
}

function DialogDrawerRoot({ children, ...props }: DialogDrawerRootProps) {
  return <RadixDialog.Root {...props}>{children}</RadixDialog.Root>
}

DialogDrawerRoot.displayName = 'DialogDrawer.Root'

interface DialogDrawerTriggerProps {
  children: ReactNode
}

function DialogDrawerTrigger({ children }: DialogDrawerTriggerProps) {
  return <RadixDialog.Trigger asChild>{children}</RadixDialog.Trigger>
}

DialogDrawerTrigger.displayName = 'DialogDrawer.Trigger'

interface DialogDrawerTitleProps
  extends HtmlHTMLAttributes<HTMLHeadingElement> {
  children: ReactNode
}

function DialogDrawerTitle({
  children,
  className,
  ...props
}: DialogDrawerTitleProps) {
  return (
    <RadixDialog.Title asChild>
      <h1 className={clsx('mb-6', className)} {...props}>
        {children}
      </h1>
    </RadixDialog.Title>
  )
}

DialogDrawerTitle.displayName = 'DialogDrawer.Title'

interface DialogDrawerDescriptionProps
  extends HtmlHTMLAttributes<HTMLParagraphElement> {
  children: ReactNode
}

function DialogDrawerDescription({
  children,
  className,
  ...props
}: DialogDrawerDescriptionProps) {
  return (
    <RadixDialog.Description asChild>
      <p className={clsx('mb-4', className)} {...props}>
        {children}
      </p>
    </RadixDialog.Description>
  )
}

DialogDrawerDescription.displayName = 'DialogDrawer.Description'

interface DialogDrawerIconCloseProps {
  Icon?: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>
}

function DialogDrawerIconClose({ Icon = X }: DialogDrawerIconCloseProps) {
  return (
    <RadixDialog.Close
      asChild
      className="flex items-center justify-center absolute top-6 right-6 text-gray-100 text-2xl hover:text-white-50 transition-colors"
    >
      <button aria-label="Close">
        <Icon weight="bold" />
      </button>
    </RadixDialog.Close>
  )
}

DialogDrawerIconClose.displayName = 'DialogDrawer.IconClose'

interface DialogDrawerCloseProps {
  children: ReactNode
}

function DialogDrawerClose({ children }: DialogDrawerCloseProps) {
  return <RadixDialog.Close asChild>{children}</RadixDialog.Close>
}

DialogDrawerClose.displayName = 'DialogDrawer.Close'

interface DialogDrawerContentProps extends RadixDialog.DialogPortalProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  children: ReactNode
}

function DialogDrawerContent({
  size = 'md',
  children,
  ...props
}: DialogDrawerContentProps) {
  return (
    <RadixDialog.Portal {...props}>
      <RadixDialog.Overlay className="fixed z-50 inset-0 bg-black bg-opacity-40 animate-dialog-open md:hidden" />

      <RadixDialog.Content
        className={clsx(
          'fixed top-0 left-0 z-50 w-full h-full max-w-xs overflow-auto bg-gray-800 shadow-lg text-gray-50 animate-dialog-open-left md:hidden',
          {
            'sm:max-w-xs': size === 'xs',
            'sm:max-w-sm': size === 'sm',
            'sm:max-w-md': size === 'md',
            'sm:max-w-lg': size === 'lg',
            'sm:max-w-xl': size === 'xl',
            'sm:max-w-2xl': size === '2xl',
            'sm:max-w-3xl': size === '3xl'
          }
        )}
      >
        <ScrollArea className="w-full h-full">
          <div className="w-full h-full min-h-full flex flex-1 flex-col p-6">
            {children}
          </div>
        </ScrollArea>
      </RadixDialog.Content>
    </RadixDialog.Portal>
  )
}

DialogDrawerContent.displayName = 'DialogDrawer.Content'

export const DialogDrawer = {
  Root: DialogDrawerRoot,
  Trigger: DialogDrawerTrigger,
  Title: DialogDrawerTitle,
  Description: DialogDrawerDescription,
  IconClose: DialogDrawerIconClose,
  Close: DialogDrawerClose,
  Content: DialogDrawerContent
}
