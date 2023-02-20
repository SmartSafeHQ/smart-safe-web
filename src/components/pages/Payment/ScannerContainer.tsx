import { useZxing } from 'react-zxing'

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
  const { ref } = useZxing({
    onResult(codeData) {
      const scannerStrategy = new ScannerStrategy(new QrCodeScanner())

      const scanResult = scannerStrategy.scan(codeData.getText())

      setQrCodeDecodedData(scanResult as QrCodeData)
    },
    deviceId:
      usersCameraDevices.backCameraId || usersCameraDevices.frontCameraId
  })

  return (
    <div className="rounded-lg overflow-hidden w-64 h-64 sm:w-96">
      <video
        ref={ref}
        autoPlay={true}
        className="border-1 border-red-500 w-64 h-64"
      />
    </div>
  )
}
