import { QrReaderProps, QrReader } from 'react-qr-reader'

type QrCodeReaderProps = QrReaderProps

export function QrCodeReader({
  constraints,
  scanDelay = 0,
  ...props
}: QrCodeReaderProps) {
  return (
    <QrReader
      constraints={{
        ...constraints,
        facingMode: 'environment'
      }}
      scanDelay={scanDelay}
      containerStyle={{ width: '100%' }}
      {...props}
    />
  )
}
