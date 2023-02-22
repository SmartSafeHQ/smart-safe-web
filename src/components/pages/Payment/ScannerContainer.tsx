import { useI18n } from '@hooks/useI18n'

import { Button } from '@components/Button'

import type { Dispatch, SetStateAction } from 'react'

import type { QrCodeData } from './ScannerStrategy'

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
    <Button
      className="w-[200px]"
      onClick={() => {
        setQrCodeDecodedData(undefined)
        setIsScannerOpen(true)
      }}
    >
      {t.payment.scanQrCodeButtonTrigger}
    </Button>
  )
}
