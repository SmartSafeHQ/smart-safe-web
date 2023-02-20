import { Camera } from 'phosphor-react'
import { useZxing } from 'react-zxing'

import { useI18n } from '@hooks/useI18n'

import { ScannerStrategy, QrCodeScanner } from './ScannerStrategy'

import type { QrCodeData } from './ScannerStrategy'
import type { Dispatch, SetStateAction } from 'react'

type Props = {
  usersCameraDevices: { frontCameraId: string; backCameraId: string }
  setQrCodeDecodedData: Dispatch<SetStateAction<QrCodeData | undefined>>
}

export function ScannerContainer({
  setQrCodeDecodedData,
  usersCameraDevices
}: Props) {
  const { t } = useI18n()
  const { ref } = useZxing({
    onResult(codeData) {
      const scannerStrategy = new ScannerStrategy(new QrCodeScanner())

      const scanResult = scannerStrategy.scan(codeData.getText())

      setQrCodeDecodedData(scanResult as QrCodeData)
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
        after:opacity-50'
    >
      <video ref={ref} className="w-screen h-screen object-cover" />

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
          items-center
          p-2
          "
      >
        <Camera size={26} />

        <p className="text-center font-medium">
          {t.payment.paymentData.instructions}
        </p>
      </div>
    </div>
  )
}
