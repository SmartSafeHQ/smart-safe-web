import { useI18n } from '@hooks/useI18n'

export function Balance() {
  const { t } = useI18n()

  return (
    <div className="flex flex-col">
      <p className="text-gray-600 font-medium dark:text-gray-400">
        {t.cashback.cashbackBalance}
      </p>

      <span className="text-3xl font-bold">
        0.00 ({t.cashback.cashbackSoon})
      </span>
    </div>
  )
}
