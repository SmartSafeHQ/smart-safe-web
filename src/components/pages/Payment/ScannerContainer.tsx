import type { Dispatch, SetStateAction } from 'react'
import { QrCode } from 'phosphor-react'

import type { QrCodeData } from './ScannerStrategy'

import { useI18n } from '@hooks/useI18n'

import { Button } from '@components/Button'

type Props = {
  setIsScannerOpen: Dispatch<SetStateAction<boolean>>
  setQrCodeDecodedData: Dispatch<SetStateAction<QrCodeData>>
}

export function ScannerContainer({
  setIsScannerOpen,
  setQrCodeDecodedData
}: Props) {
  const { t } = useI18n()

  return (
    <div className="w-full h-[20rem] max-w-[26rem] flex flex-col items-center justify-center gap-5 rounded-md bg-gray-200 dark:bg-gray-800">
      <div className="p-8 w-full flex flex-1 flex-col items-center justify-between gap-4">
        <QrCode className="w-52 h-52 text-gray-600 dark:text-gray-50" />

        <Button
          className="w-52"
          onClick={() => {
            setQrCodeDecodedData(undefined)
            setIsScannerOpen(true)
          }}
        >
          {t.payment.scanQrCodeButtonTrigger}
        </Button>
      </div>
    </div>
  )
}
