import { useZxing } from 'react-zxing'

import type { Dispatch, SetStateAction } from 'react'

type Props = {
  setQrCodeDecodedData: Dispatch<
    SetStateAction<{ id: number; data: string; size: number }[]>
  >
}

export function ScannerContainer({ setQrCodeDecodedData }: Props) {
  const { ref } = useZxing({
    onResult(result) {
      const pixCode = result.getText()

      const qrCodeData = pixCode.substring(6)
      const qrCodeDataLength = qrCodeData.length

      const extractedData = []
      let nextIterationStartIndex = 0

      while (nextIterationStartIndex < qrCodeDataLength) {
        const id = parseInt(
          qrCodeData.substring(
            nextIterationStartIndex,
            nextIterationStartIndex + 2
          )
        )

        nextIterationStartIndex += 2

        const dataLength = parseInt(
          qrCodeData.substring(
            nextIterationStartIndex,
            nextIterationStartIndex + 2
          )
        )

        nextIterationStartIndex += 2

        const data = qrCodeData.substring(
          nextIterationStartIndex,
          nextIterationStartIndex + dataLength
        )

        extractedData.push({ id, size: dataLength, data })

        nextIterationStartIndex += dataLength
      }

      setQrCodeDecodedData(extractedData)
    }
  })

  return (
    <div className="rounded-lg overflow-hidden w-full h-60">
      <video ref={ref} />
    </div>
  )
}
