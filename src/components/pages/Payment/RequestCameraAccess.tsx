import { Button } from '@components/Button'

import { useI18n } from '@hooks/useI18n'

import type { Dispatch, SetStateAction } from 'react'

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
    <div className="flex flex-col gap-2 items-center justify-center w-full max-w-xl h-min rounded-lg p-4 bg-gray-200 dark:bg-gray-800">
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
  )
}
