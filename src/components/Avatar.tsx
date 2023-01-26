import * as RadixAvatar from '@radix-ui/react-avatar'
import { ReactNode } from 'react'
import clsx from 'clsx'

interface AvatarRootProps extends RadixAvatar.AvatarProps {
  fallbackName?: string
  children: ReactNode
}

export function AvatarRoot({
  fallbackName = 'tk',
  className,
  children,
  ...props
}: AvatarRootProps) {
  return (
    <RadixAvatar.Root
      className={clsx(
        'inline-flex items-center justify-center align-middle overflow-hidden select-none rounded-full bg-gray-300 dark:bg-gray-800',
        className
      )}
      {...props}
    >
      {children}

      <RadixAvatar.Fallback className="w-full min-h-full flex flex-1 items-center justify-center uppercase text-sm font-semibold bg-gray-200 dark:bg-gray-700 text-cyan-500 md:text-lg">
        {fallbackName}
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  )
}

AvatarRoot.displayName = 'Avatar.Root'

type AvatarImageProps = RadixAvatar.AvatarImageProps

export function AvatarImage({ className, ...props }: AvatarImageProps) {
  return (
    <RadixAvatar.Image
      className={clsx('w-full h-full bg-cover rounded-full', className)}
      {...props}
    />
  )
}

AvatarImage.displayName = 'Avatar.Image'

export const Avatar = {
  Root: AvatarRoot,
  Image: AvatarImage
}