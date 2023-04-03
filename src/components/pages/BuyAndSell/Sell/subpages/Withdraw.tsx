import { CheckCircle } from 'phosphor-react'

import { Button } from '@/components/Button'
import { Heading } from '@/components/Heading'

import { useI18n } from '@/hooks/useI18n'
import { useSellContext } from '@/contexts/pages/SellContext'

import type { Dispatch, SetStateAction } from 'react'
import type { Screens } from '@/pages/dashboard/buy-and-sell/sell'

type Props = {
  setCurrentScreen: Dispatch<SetStateAction<Screens>>
}

export function Withdraw({ setCurrentScreen }: Props) {
  const { t } = useI18n()
  const { trigger, getValues } = useSellContext()

  async function handlePageChange() {
    const areFieldsValid = await trigger()

    if (!areFieldsValid) {
      return
    }

    setCurrentScreen('stable-coin-amount')
  }

  return (
    <div className="flex flex-col gap-2">
      <Heading className="text-center text-2xl">
        {t.sell.withdrawalSuccessHeading}
      </Heading>

      <div className="flex items-center justify-center">
        <CheckCircle size={92} weight="fill" className="fill-green-500" />
      </div>

      <div className="flex flex-col items-center justify-center">
        <p>{t.sell.withdrawalAmount}</p>

        <span className="font-bold">
          {Intl.NumberFormat('pt-BR', {
            currency: 'BRL',
            style: 'currency'
          }).format(Number(getValues('amountToWithdraw')) || 0)}
        </span>
      </div>

      <Button onClick={handlePageChange}>{t.sell.closeButton}</Button>
    </div>
  )
}
