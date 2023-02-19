import { useZxing } from 'react-zxing'

import { ScannerStrategy, QrCodeScanner } from './ScannerStrategy'

import { useListUsersCameraDevices } from '@hooks/payment'

import type { QrCodeData } from './ScannerStrategy'
import type { Dispatch, SetStateAction } from 'react'

type Props = {
  setQrCodeDecodedData: Dispatch<SetStateAction<QrCodeData | undefined>>
}

export function ScannerContainer({ setQrCodeDecodedData }: Props) {
  const { usersCameraDevices } = useListUsersCameraDevices()

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
    <div className="rounded-lg overflow-hidden w-64 sm:w-96">
      <video autoPlay={true} ref={ref} className="border-1 border-red-500" />
    </div>
  )
}
