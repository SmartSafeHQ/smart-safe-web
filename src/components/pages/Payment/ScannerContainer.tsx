import { useEffect, useRef } from 'react'
// import { useZxing } from 'react-zxing'
// import {
//   BarcodeFormat,
//   DecodeHintType,
//   BrowserMultiFormatReader
// } from '@zxing/library'

// import { ScannerStrategy, QrCodeScanner } from './ScannerStrategy'

// import type { QrCodeData } from './ScannerStrategy'
// import type { Dispatch, SetStateAction } from 'react'

// type Props = {
//   usersCameraDevices: { frontCameraId: string; backCameraId: string }
//   setQrCodeDecodedData: Dispatch<SetStateAction<QrCodeData | undefined>>
// }

export function ScannerContainer(/* {
  setQrCodeDecodedData
}: // usersCameraDevices
Props */) {
  // const { ref } = useZxing({
  //   onResult(codeData) {
  //     const scannerStrategy = new ScannerStrategy(new QrCodeScanner())

  //     const scanResult = scannerStrategy.scan(codeData.getText())

  //     setQrCodeDecodedData(scanResult as QrCodeData)
  //   },
  //   deviceId:
  //     usersCameraDevices.backCameraId || usersCameraDevices.frontCameraId
  // })

  const videoStream = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoStream.current instanceof HTMLVideoElement) {
      window.navigator.mediaDevices
        .getUserMedia({
          video: { facingMode: 'environment' }
        })
        .then(mediaStream => {
          videoStream.current!.srcObject = mediaStream

          // const hints = new Map()
          // const formats = [BarcodeFormat.QR_CODE]
          // hints.set(DecodeHintType.POSSIBLE_FORMATS, formats)

          // const reader = new BrowserMultiFormatReader(hints)

          // reader.timeBetweenDecodingAttempts = 1000

          // reader.decodeFromStream(
          //   mediaStream,
          //   videoStream.current as HTMLVideoElement,
          //   result => {
          //     if (result) {
          //       const scannerStrategy = new ScannerStrategy(new QrCodeScanner())

          //       const scanResult = scannerStrategy.scan(result.getText())

          //       setQrCodeDecodedData(scanResult as QrCodeData)
          //     }
          //   }
          // )
        })
    }
  }, [videoStream.current])

  return (
    <div className="rounded-lg overflow-hidden w-64 h-64 sm:w-96">
      <video
        ref={videoStream}
        autoPlay={true}
        className="border-1 border-red-500 w-64 h-64"
      />
    </div>
  )
}
