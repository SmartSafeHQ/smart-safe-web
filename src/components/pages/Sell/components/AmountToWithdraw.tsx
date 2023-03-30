import { useI18n } from '@/hooks/useI18n'
import { useSellContext } from '@/contexts/pages/SellContext'

export function AmountToWithdraw() {
  const { t } = useI18n()
  const { watch } = useSellContext()

  const amountToWithdraw = watch('amountToWithdraw')

  return (
    <div className="flex flex-col overflow-hidden rounded-md border-1 bg-brand-foregroundAccent1/10 border-brand-foregroundAccent2/30 dark:border-gray-800 dark:bg-gray-800/40">
      <p className="flex flex-col gap-1 p-2">
        {t.sell.youWillWithdraw}{' '}
        <span className="font-bold">
          {Intl.NumberFormat('pt-BR', {
            currency: 'BRL',
            style: 'currency'
          }).format(Number(amountToWithdraw || 0))}
        </span>
      </p>

      <div className="w-full h-[1px] bg-slate-400/20" />

      <p className="p-2 text-yellow-400">{t.sell.withdrawSpread}</p>
    </div>
  )
}
