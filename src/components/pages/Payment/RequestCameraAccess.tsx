import { Button } from '@components/Button'

import { useI18n } from '@hooks/useI18n'
import { useCameraDevice } from '@hooks/payment'

export function RequestCameraAccesss() {
  const { t } = useI18n()
  const { usersCameraDevices, grantAccess } = useCameraDevice()

  return (
    <div className="flex flex-col gap-2 items-center justify-center w-full max-w-xl h-min rounded-lg p-4 bg-gray-200 dark:bg-gray-800">
      <Button className="w-52" onClick={() => grantAccess(usersCameraDevices)}>
        {t.payment.grantCameraAccess}
      </Button>

      <p className="text-center">{t.payment.grantCameraAccessDescription}</p>
    </div>
  )
}
