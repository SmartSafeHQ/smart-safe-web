import { useI18n } from '@hooks/useI18n'

import { Button } from '@components/Button'

import type { Dispatch, SetStateAction } from 'react'

type Props = {
  setIsScannerOpen: Dispatch<SetStateAction<boolean>>
}

export function ScannerContainer({ setIsScannerOpen }: Props) {
  const { t } = useI18n()

  return (
    <Button className="w-[200px]" onClick={() => setIsScannerOpen(true)}>
      {t.payment.scanQrCodeButtonTrigger}
    </Button>
  )
}
