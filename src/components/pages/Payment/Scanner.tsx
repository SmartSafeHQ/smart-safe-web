import { Camera } from 'phosphor-react'
import { useZxing } from 'react-zxing'

import { useI18n } from '@hooks/useI18n'

import { ScannerStrategy, QrCodeScanner } from './ScannerStrategy'

import { CameraControls } from './CameraControls'

import type { QrCodeData } from './ScannerStrategy'
import type { Dispatch, SetStateAction } from 'react'

type Props = {
  currentSelectedDeviceId: string
  setIsScannerOpen: Dispatch<SetStateAction<boolean>>
  setQrCodeDecodedData: Dispatch<SetStateAction<QrCodeData | undefined>>
}

export function Scanner({
  setIsScannerOpen,
  setQrCodeDecodedData,
  currentSelectedDeviceId
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
    deviceId: currentSelectedDeviceId
  })

  return (
    <div
      className='
        w-full
        rounded-lg
        overflow-hidden
        absolute
        sm:relative
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
        className="w-screen sm:w-full h-screen sm:h-full object-cover"
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
          items-center
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

        <CameraControls setIsScannerOpen={setIsScannerOpen} />
      </div>
    </div>
  )
}