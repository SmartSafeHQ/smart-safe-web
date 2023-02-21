import type { Result, UseZxingOptions } from 'react-zxing'

import { useZxing } from 'react-zxing'

type QrCodeReaderProps = UseZxingOptions & {
  // eslint-disable-next-line no-undef
  constraints: MediaStreamConstraints
  onResult: (_result: Result) => unknown
}

export function QrCodeReader({
  timeBetweenDecodingAttempts = 0,
  constraints,
  onResult
}: QrCodeReaderProps) {
  const { ref } = useZxing({
    onResult,
    timeBetweenDecodingAttempts,
    constraints
  })

  return (
    <div className="w-full h-full relative">
      <video ref={ref} className="w-full h-full object-contain" />
    </div>
  )
}
