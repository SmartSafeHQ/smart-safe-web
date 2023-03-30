import type { Dispatch, SetStateAction } from 'react'
import type { Screens } from '@/pages/dashboard/buy-and-sell/sell'

type Props = {
  setCurrentScreen: Dispatch<SetStateAction<Screens>>
}

export function BankAccountDataConfirmation({ setCurrentScreen }: Props) {
  return (
    <div>
      <p onClick={() => setCurrentScreen('bank-account-data')}>Voltar</p>
      confirmation
    </div>
  )
}
