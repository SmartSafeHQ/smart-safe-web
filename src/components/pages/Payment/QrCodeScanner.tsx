import { useState } from 'react'

import { Button } from '@components/Button'
import { RequestCameraAccesss } from '@components/pages/Payment/RequestCameraAccess'

import { useI18n } from '@hooks/useI18n'
import { useCameraDevice } from '@hooks/payment'

import { Scanner } from './Scanner'
import { ScannerContainer } from './ScannerContainer'
import { QrCodeDecodedData } from './QrCodeDecodedData'
import { PaymentOptions } from './PaymentOptions'
import { CameraControls } from './CameraControls'

import type { QrCodeData } from './ScannerStrategy'

export function QrCodeScanner() {
  const [isScannerOpen, setIsScannerOpen] = useState(false)
  const [qrCodeDecodedData, setQrCodeDecodedData] = useState<QrCodeData>()

  const { t } = useI18n()
  const {
    isAppReadyToDisplayVideoStream,
    usersCameraDevices,
    grantAccess,
    currentSelectedDeviceId
  } = useCameraDevice()

  return (
    <div className="flex flex-col sm:flex-row gap-5">
      <div className="flex flex-col gap-2 items-center justify-center w-full h-[400px] rounded-lg p-4 bg-gray-200 dark:bg-gray-800">
        {!isAppReadyToDisplayVideoStream && (
          <RequestCameraAccesss
            grantAccess={grantAccess}
            setIsScannerOpen={setIsScannerOpen}
            usersCameraDevices={usersCameraDevices}
          />
        )}

        {isAppReadyToDisplayVideoStream &&
          !qrCodeDecodedData &&
          !isScannerOpen && (
            <ScannerContainer setIsScannerOpen={setIsScannerOpen} />
          )}

        {isScannerOpen && (
          <>
            <Scanner
              setIsScannerOpen={setIsScannerOpen}
              setQrCodeDecodedData={setQrCodeDecodedData}
              currentSelectedDeviceId={currentSelectedDeviceId}
            />

            <CameraControls setIsScannerOpen={setIsScannerOpen} />
          </>
        )}
      </div>

      {qrCodeDecodedData && (
        <div className="flex flex-col gap-2">
          <QrCodeDecodedData qrCodeDecodedData={qrCodeDecodedData} />

          <PaymentOptions />

          <Button disabled>{t.payment.paymentData.chooseHowToPay}</Button>
        </div>
      )}
    </div>
  )
}
