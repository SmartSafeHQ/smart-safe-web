import Image from 'next/image'
import { useState } from 'react'
import { Camera } from 'phosphor-react'

import { Button } from '@components/Button'

import { useI18n } from '@hooks/useI18n'
import { useAuth } from '@contexts/AuthContext'
import { useCameraDevice } from '@hooks/payment'
import { useCustomerCoins } from '@hooks/global/coins/queries/useCustomerCoins'

import { ScannerContainer } from './ScannerContainer'

import type { QrCodeData } from './ScannerStrategy'

export function QrCodeScanner() {
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
      {isAppReadyToDisplayVideoStream ? (
        <ScannerContainer
          setQrCodeDecodedData={setQrCodeDecodedData}
          usersCameraDevices={usersCameraDevices}
        />
      ) : (
        <div className="flex flex-col gap-2 items-center justify-center w-full max-w-xl h-60 rounded-lg p-1 bg-gray-200 dark:bg-gray-800">
          <Button
            className="w-52"
            onClick={() => grantAccess(usersCameraDevices)}
          >
            {t.payment.grantCameraAccess}
          </Button>

          <p className="text-center">
            {t.payment.grantCameraAccessDescription}
          </p>
        </div>
      )}

      {qrCodeDecodedData ? (
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
      ) : (
        <div className="rounded-lg p-2 flex flex-col items-center h-min bg-gray-200 dark:bg-gray-800">
          <Camera size={26} />

          <p className="text-center font-medium">
            {t.payment.paymentData.instructions}
          </p>
        </div>
      )}
    </div>
  )
}
