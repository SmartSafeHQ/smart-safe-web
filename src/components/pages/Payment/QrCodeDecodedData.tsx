import { useI18n } from '@hooks/useI18n'
import { QrCodeData } from './ScannerStrategy'

type Props = {
  qrCodeDecodedData: QrCodeData
}

export function QrCodeDecodedData({ qrCodeDecodedData }: Props) {
  const { t, currentLocaleProps } = useI18n()

  return (
    <div className="flex flex-col gap-1">
      <h1 className="font-medium text-lg">
        {t.payment.paymentData.paymentTitle}
      </h1>

      <div>
        <p className="font-medium text-2xl">
          {Intl.NumberFormat(currentLocaleProps.slug, {
            currency: currentLocaleProps.slug === 'pt-BR' ? 'BRL' : 'USD',
            style: 'currency'
          }).format(qrCodeDecodedData?.transactionAmount || 0)}
        </p>

        <p className="dark:text-gray-400">
          {t.payment.paymentData.to}{' '}
          <span className="font-medium uppercase dark:text-white">
            {qrCodeDecodedData?.merchantName}
          </span>
        </p>
      </div>
    </div>
  )
}
