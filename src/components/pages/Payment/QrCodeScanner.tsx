import { useState } from 'react'

import { useHasUserGrantedCameraAccess } from '@hooks/payment/useHasUserGrantedCameraAccess'

import { ScannerContainer } from './ScannerContainer'

export function QrCodeScanner() {
  const [qrCodeDecodedData, setQrCodeDecodedData] = useState<
    { id: number; data: string; size: number }[]
  >([])

  const { hasUserGrantedCameraAccess } = useHasUserGrantedCameraAccess()

  return (
    <div>
      {hasUserGrantedCameraAccess ? (
        <ScannerContainer setQrCodeDecodedData={setQrCodeDecodedData} />
      ) : (
        <div className="bg-white w-full h-60 rounded-lg"></div>
      )}

      <table>
        <thead>
          <tr>
            <th className="first:pl-4 px-2 pb-2 whitespace-nowrap text-start font-semibold text-xs md:text-sm md:px-0">
              id
            </th>
            <th className="first:pl-4 px-2 pb-2 whitespace-nowrap text-start font-semibold text-xs md:text-sm md:px-0">
              data
            </th>
            <th className="first:pl-4 px-2 pb-2 whitespace-nowrap text-start font-semibold text-xs md:text-sm md:px-0">
              size
            </th>
          </tr>
        </thead>

        <tbody>
          {qrCodeDecodedData &&
            qrCodeDecodedData.map(item => (
              <tr
                key={item.id}
                className="[&>*]:min-w-[7rem] text-gray-800 dark:text-gray-50 font-medium border-b-[0.5px] border-gray-400 dark:border-gray-600"
              >
                <td className="pl-4 py-3 !min-w-[12rem]">{item.id}</td>
                <td className="pl-4 py-3 !min-w-[12rem]">{item.data}</td>
                <td className="pl-4 py-3 !min-w-[12rem]">{item.size}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
