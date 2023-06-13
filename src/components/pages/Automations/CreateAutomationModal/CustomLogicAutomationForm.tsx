import { Wrench } from '@phosphor-icons/react'

import { Text } from '@components/Text'

export function CustomLogicAutomationForm() {
  return (
    <div className="w-full h-[28.5rem] flex flex-col justify-start items-stretch gap-6 py-8 px-4 sm:px-8">
      <div className="w-full flex items-center justify-start gap-2">
        <Wrench className="w-5 h-5 text-gray-500" />

        <Text className="text-gray-500">Under development</Text>
      </div>
    </div>
  )
}
