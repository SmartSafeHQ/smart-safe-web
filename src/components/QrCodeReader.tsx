import type { Result, UseZxingOptions } from 'react-zxing'

import { Camera } from 'phosphor-react'
import { useZxing } from 'react-zxing'

import { useI18n } from '@hooks/useI18n'

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
  const { t } = useI18n()
  const { ref } = useZxing({
    onResult,
    timeBetweenDecodingAttempts,
    constraints
  })

  return (
    <div className="rounded-md relative w-full overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full clip-square"></div>

      <video
        ref={ref}
        controls={false}
        className="w-full h-full object-cover"
      />

      <div className=" absolute top-0 left-0 z-10 w-full h-full flex flex-col items-center justify-between p-2">
        <div className="flex flex-col items-center">
          <Camera size={26} />

          <p className="text-center text-sm font-medium">
            {t.qrCodeReader.instructions}
          </p>
        </div>
      </div>
    </div>
  )
}
