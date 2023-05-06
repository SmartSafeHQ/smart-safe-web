import { Heading } from '@components/Heading'
import { Text } from '@components/Text'

export function WalletCreatedSafes() {
  return (
    <div className="w-full min-w-[24rem] min-h-[34rem] flex flex-col flex-1 items-stretch justify-start relative p-6 shadow-none rounded-lg bg-zinc-100 dark:bg-zinc-900 border-1 border-zinc-200 dark:border-zinc-700 lg:max-w-[27rem]">
      <div className="flex justify-center items-stretch mb-4 md:justify-start">
        <Heading className="text-xl font-semibold">Your safes</Heading>
      </div>

      <div className="w-ful flex flex-col items-center justify-center">
        <Text className="text-gray-800 dark:text-gray-400">
          You have no safes yet!
        </Text>
      </div>
    </div>
  )
}
