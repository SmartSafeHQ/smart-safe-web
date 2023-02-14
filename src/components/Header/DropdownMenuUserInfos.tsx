import { Avatar } from '@components/Avatar'

interface DropdownMenuUserInfosProps {
  name: string
  email: string
  shortName?: string
}

export function DropdownMenuUserInfos({
  name,
  email,
  shortName
}: DropdownMenuUserInfosProps) {
  return (
    <div className="w-full flex items-start justify-start gap-4 px-4 pt-2 pb-1">
      <Avatar.Root
        fallbackName={shortName ?? name.substring(0, 2)}
        className="min-w-[3.5rem] h-[3.5rem]"
      >
        <Avatar.Image src="#" alt={name} />
      </Avatar.Root>

      <div className="w-full flex flex-col items-start gap-1">
        <strong className="text-gray-800 dark:text-gray-50 text-lg">
          {name.split(' ').slice(0, 2).join(' ')}
        </strong>

        <span className="text-gray-700 dark:text-gray-300 text-sm">
          {email.substring(0, 18)}...
        </span>
      </div>
    </div>
  )
}
