import { Camera } from 'phosphor-react'
import { useZxing } from 'react-zxing'

import { useI18n } from '@hooks/useI18n'

import { Button } from '@components/Button'

import { ScannerStrategy, QrCodeScanner } from './ScannerStrategy'

import type { QrCodeData } from './ScannerStrategy'
import type { Dispatch, SetStateAction } from 'react'

type Props = {
  setIsScannerOpen: Dispatch<SetStateAction<boolean>>
  usersCameraDevices: { frontCameraId: string; backCameraId: string }
  setQrCodeDecodedData: Dispatch<SetStateAction<QrCodeData | undefined>>
}

export function Scanner({
  setQrCodeDecodedData,
  usersCameraDevices,
  setIsScannerOpen
}: Props) {
  const { t } = useI18n()
  const { ref } = useZxing({
    onResult(codeData) {
      const scannerStrategy = new ScannerStrategy(new QrCodeScanner())

      const scanResult = scannerStrategy.scan(codeData.getText())

      setQrCodeDecodedData(scanResult as QrCodeData)
      setIsScannerOpen(false)
    },
    constraints: {
      video: { facingMode: 'environment' }
    },
    deviceId:
      usersCameraDevices.backCameraId || usersCameraDevices.frontCameraId
  })

  return (
    <div
      className='
        rounded-lg
        overflow-hidden
        absolute
        top-0
        left-0
        z-10
        after:content-[""]
        after:w-full
        after:h-full
        after:bg-gray-800
        after:absolute
        after:top-0
        after:left-0
        after:opacity-50
        '
    >
      <video
        ref={ref}
        controls={false}
        className="w-screen h-screen object-cover"
      />

      <div
        className="
          absolute
          top-0
          left-0
          z-10
          w-full
          h-full
          flex
          flex-col
          justify-between
          p-2
        "
      >
        <div className="flex flex-col items-center">
          <Camera size={26} />

          <p className="text-center font-medium">
            {t.payment.paymentData.instructions}
          </p>
        </div>

        <Button onClick={() => setIsScannerOpen(false)}>
          {t.payment.closeCameraButtonTrigger}
        </Button>
      </div>
    </div>
  )
}
