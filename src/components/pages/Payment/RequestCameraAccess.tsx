import type { Dispatch, SetStateAction } from 'react'
import { QrCode } from 'phosphor-react'

import { Button } from '@components/Button'

import { useI18n } from '@hooks/useI18n'

type Props = {
  setIsScannerOpen: Dispatch<SetStateAction<boolean>>
  usersCameraDevices: {
    frontCameraId: string
    backCameraId: string
  }
  grantAccess: (_usersCameraDevices: {
    frontCameraId: string
    backCameraId: string
  }) => Promise<void>
}

export function RequestCameraAccesss({
  grantAccess,
  setIsScannerOpen,
  usersCameraDevices
}: Props) {
  const { t } = useI18n()

  return (
    <div className="w-full h-[20rem] max-w-[26rem] flex flex-col items-center justify-center gap-5 rounded-md bg-gray-200 dark:bg-gray-800">
      <div className="p-8 w-full flex flex-1 flex-col items-center justify-between gap-4">
        <QrCode className="w-52 h-52 text-gray-600 dark:text-gray-50" />

        <Button
          className="w-52"
          onClick={async () => {
            await grantAccess(usersCameraDevices)

            setIsScannerOpen(true)
          }}
        >
          {t.payment.grantCameraAccess}
        </Button>

        <p className="text-center">{t.payment.grantCameraAccessDescription}</p>
      </div>
    </div>
  )
}
