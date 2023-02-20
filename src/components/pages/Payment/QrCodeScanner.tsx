import Image from 'next/image'
import { useState } from 'react'

import { Button } from '@components/Button'
import { RequestCameraAccesss } from '@components/pages/Payment/RequestCameraAccess'

import { useI18n } from '@hooks/useI18n'
import { useAuth } from '@contexts/AuthContext'
import { useCameraDevice } from '@hooks/payment'
import { useCustomerCoins } from '@hooks/global/coins/queries/useCustomerCoins'

import { ScannerContainer } from './ScannerContainer'
import { Scanner } from './Scanner'

import type { QrCodeData } from './ScannerStrategy'

export function QrCodeScanner() {
  const [isScannerOpen, setIsScannerOpen] = useState(false)
  const [qrCodeDecodedData, setQrCodeDecodedData] = useState<QrCodeData>()
  const [currencySelectedForPayment, setCurrencySelectedForPayment] =
    useState('')

  const { customer } = useAuth()
  const { t, currentLocaleProps } = useI18n()
  const { data: nativeCurrencies } = useCustomerCoins(customer?.wallet.address)
  const { isAppReadyToDisplayVideoStream, usersCameraDevices, grantAccess } =
    useCameraDevice()

  return (
    <div className="flex flex-col sm:flex-row gap-5">
      {!isAppReadyToDisplayVideoStream && (
        <RequestCameraAccesss
          grantAccess={grantAccess}
          setIsScannerOpen={setIsScannerOpen}
          usersCameraDevices={usersCameraDevices}
        />
      )}

      {isAppReadyToDisplayVideoStream && !qrCodeDecodedData && (
        <ScannerContainer setIsScannerOpen={setIsScannerOpen} />
      )}

      {isScannerOpen && (
        <Scanner
          setQrCodeDecodedData={setQrCodeDecodedData}
          usersCameraDevices={usersCameraDevices}
          setIsScannerOpen={setIsScannerOpen}
        />
      )}

      {qrCodeDecodedData && (
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <h1 className="font-medium text-lg">
              {t.payment.paymentData.paymentTitle}
            </h1>

            <div>
              <p className="font-medium text-2xl">
                {Intl.NumberFormat(currentLocaleProps.slug, {
                  currency: currentLocaleProps.slug === 'pt-BR' ? 'BRL' : 'USD',
                  style: 'currency'
                }).format(qrCodeDecodedData.transactionAmount)}
              </p>

              <p className="dark:text-gray-400">
                {t.payment.paymentData.to}{' '}
                <span className="font-medium uppercase dark:text-white">
                  {qrCodeDecodedData.merchantName}
                </span>
              </p>
            </div>
          </div>

          {nativeCurrencies?.coins.map(({ symbol, avatar }) => (
            <label
              key={symbol}
              htmlFor={symbol}
              className={`flex gap-2 uppercase border-1 border-gray-800 p-2 rounded-lg cursor-pointer ${
                currencySelectedForPayment === symbol
                  ? 'dark:border-cyan-400 border-cyan-600 border-2'
                  : 'dark:border-gray-800 border-gray-300'
              }`}
            >
              <input
                id={symbol}
                type="radio"
                value={symbol}
                className="hidden"
                name="nativeCurrency"
                onChange={({ target: { value } }) =>
                  setCurrencySelectedForPayment(value)
                }
              />

              <Image
                width={25}
                height={25}
                src={avatar}
                alt={`${symbol}'s icon`}
              />
              {symbol}
            </label>
          ))}

          <Button disabled>{t.payment.paymentData.chooseHowToPay}</Button>
        </div>
      )}
    </div>
  )
}
