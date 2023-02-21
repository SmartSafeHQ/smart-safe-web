/* eslint-disable no-undef */
import { useZxing } from 'react-zxing'

import type { Result, UseZxingOptions } from 'react-zxing'

type QrCodeReaderProps = UseZxingOptions & {
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
      <video className="w-full h-full object-contain" ref={ref} />
    </div>
  )
}
