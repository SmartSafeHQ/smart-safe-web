import Image from 'next/image'
import { useState } from 'react'

import { useAuth } from '@contexts/AuthContext'
import { useCustomerCoins } from '@hooks/global/coins/queries/useCustomerCoins'

export function PaymentOptions() {
  const [currencySelectedForPayment, setCurrencySelectedForPayment] =
    useState('')

  const { customer } = useAuth()
  const { data: nativeCurrencies } = useCustomerCoins(customer?.wallet.address)

  return (
    <>
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

          <Image width={25} height={25} src={avatar} alt={`${symbol}'s icon`} />
          {symbol}
        </label>
      ))}
    </>
  )
}
