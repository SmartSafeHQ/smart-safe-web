import { useZxing } from 'react-zxing'

import { ScannerStrategy, QrCodeScanner } from './ScannerStrategy'

import type { QrCodeData } from './ScannerStrategy'
import type { Dispatch, SetStateAction } from 'react'

type Props = {
  setQrCodeDecodedData: Dispatch<SetStateAction<QrCodeData | undefined>>
}

export function ScannerContainer({ setQrCodeDecodedData }: Props) {
  const { ref } = useZxing({
    onResult(codeData) {
      const scannerStrategy = new ScannerStrategy(new QrCodeScanner())

      const scanResult = scannerStrategy.scan(codeData.getText())

      setQrCodeDecodedData(scanResult as QrCodeData)
    }
  })

  return (
    <div className="rounded-lg overflow-hidden w-full sm:w-96">
      <video ref={ref} />
    </div>
  )
}
