import { Heading } from '@components/Heading'
import { Text } from '@components/Text'

interface DataConfirmationItemProps {
  title: string
  value: string
}

export function DataConfirmationItem({
  title,
  value
}: DataConfirmationItemProps) {
  return (
    <li className="w-full flex flex-col gap-2">
      <Heading className="text-xl font-semibold" asChild>
        <h4>{title}</h4>
      </Heading>

      <Text className="text-lg text-gray-500 dark:text-gray-400">{value}</Text>
    </li>
  )
}
