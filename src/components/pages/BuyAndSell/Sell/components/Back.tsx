import { ArrowLeft } from 'phosphor-react'

import type { Dispatch, SetStateAction } from 'react'
import type { Screens } from '@/pages/dashboard/buy-and-sell/sell'

type Props = {
  page: Screens
  setCurrentScreen: Dispatch<SetStateAction<Screens>>
}

export function Back({ setCurrentScreen, page }: Props) {
  return (
    <p
      className="flex gap-2 items-center border-1 border-transparent transition-colors hover:border-brand-foregroundAccent1 font-medium cursor-pointer bg-brand-foreground/5 rounded-md w-min px-2 py-1"
      onClick={() => setCurrentScreen(page)}
    >
      <ArrowLeft size={20} />
      Voltar
    </p>
  )
}
