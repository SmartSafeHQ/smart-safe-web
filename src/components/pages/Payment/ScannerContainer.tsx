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
    constraints: {
      video: { facingMode: 'environment' }
    },
    deviceId:
      usersCameraDevices.backCameraId || usersCameraDevices.frontCameraId
  })

  return (
    <div className="rounded-lg overflow-hidden w-full max-w-xl h-full absolute top-0 left-0">
      <video
        ref={ref}
        autoPlay={true}
        className="border-1 border-red-500 w-screen h-screen"
      />
    </div>
  )
}
