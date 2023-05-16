import { SmartSafeIconLogo } from '@components/Logos/SmartSafeIconLogo'
import { Heading } from '@components/Heading'
import { Text } from '@components/Text'

export function TransactionQueue() {
  return (
    <section className="max-h-[16rem] min-w-[20rem] flex flex-col flex-1 items-stretch justify-start gap-3 relative p-6 shadow-none rounded-lg ring-zinc-900 dark:ring-zinc-100 focus-within:ring-1 bg-zinc-100 dark:bg-zinc-900 border-1 border-zinc-200 dark:border-zinc-700 sm:min-w-[25rem]">
      <Heading className="text-lg font-semibold">Transaction queue</Heading>

      <div className="w-full flex flex-col items-center justify-center gap-5">
        <SmartSafeIconLogo className="w-20 h-20 opacity-60" />

        <Text className="text-sm text-center text-zinc-800 dark:text-zinc-400">
          You have no queued transactions
        </Text>
      </div>
    </section>
  )
}
