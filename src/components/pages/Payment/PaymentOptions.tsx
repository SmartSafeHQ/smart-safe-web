import Image from 'next/image'
import { useState } from 'react'

import { useCustomerCoins } from '@hooks/global/coins/queries/useCustomerCoins'

export function PaymentOptions() {
  const [currencySelectedForPayment, setCurrencySelectedForPayment] =
    useState('')

  const { data: nativeCurrencies } = useCustomerCoins()

  return (
    <>
      {nativeCurrencies?.nativeTokens.map(({ symbol, avatar }) => (
        <label
          key={symbol}
          htmlFor={symbol}
          className={`flex gap-2 uppercase border-1 border-gray-800 p-2 rounded-lg cursor-pointer ${
            currencySelectedForPayment === symbol
              ? 'dark:border-brand-foregroundAccent1 border-brand-foregroundAccent2 border-2'
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

          <Image width={25} height={25} src={avatar} alt={`${symbol}'s icon`} />
          {symbol}
        </label>
      ))}
    </>
  )
}
