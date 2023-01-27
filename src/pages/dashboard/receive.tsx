import Head from 'next/head'
import { QRCodeCanvas } from 'qrcode.react'
import { CopySimple, Export, Wallet } from 'phosphor-react'

import { Text } from '@components/Text'
import { useAuth } from '@contexts/AuthContext'
import { ActionButton } from '@components/pages/Receive/ActionButton'
import { LoadingState } from '@components/FetchingStates/LoadingState'

import { useReceive } from '@hooks/receive/useReceive'

const Receive = () => {
  const { customer } = useAuth()
  const { handleCopyWalletAddress, handleShareQrCode } = useReceive()

  return (
    <div className="w-full flex flex-col items-center justify-center px-2 pt-4">
      <Head>
        <title>Tokenverse | Receive</title>
        <meta name="description" content="Tokenverse dashboard home" />
      </Head>

      <div className="w-full max-w-lg flex flex-1 flex-col">
        <div className="w-full flex items-center flex-col gap-3 mb-4">
          <div className="w-full flex items-center justify-start gap-2">
            <Text className="text-gray-700 dark:text-gray-50 text-xl font-semibold">
              Scan the QRCode to receive funds
            </Text>
          </div>
        </div>

        <section className="w-full flex flex-col gap-4 items-stretch">
          <div className="w-full min-h-[20.5rem] flex flex-col gap-4 items-center justify-center p-6 rounded-md bg-gray-50 dark:bg-gray-800 shadow-md">
            {!customer && <LoadingState title="Loading QRCode" />}

            {customer && (
              <>
                <QRCodeCanvas value={customer.wallet.address} size={240} />

                <Text className="mt-auto text-sm break-all text-gray-800 dark:text-gray-50 sm:text-base">
                  {customer?.wallet.address}
                </Text>
              </>
            )}
          </div>

          <div className="w-full flex items-center justify-center gap-3">
            <ActionButton
              title="copy"
              Icon={CopySimple}
              onClick={handleCopyWalletAddress}
            />

            <ActionButton
              title="share"
              Icon={Export}
              onClick={handleShareQrCode}
            />
          </div>

          <div className="pt-5 border-t-2 border-t-gray-300 dark:border-t-gray-700">
            <div className="w-full flex gap-4 items-center justify-between p-3 rounded-md bg-gray-50 dark:bg-gray-800 shadow-md sm:p-5">
              <div className="flex items-center gap-3">
                <Wallet className="w-7 h-7 text-cyan-500" />

                <Text className="text-base font-semibold capitalize text-gray-700 dark:text-gray-300 sm:text-lg">
                  destiny
                </Text>
              </div>

              <div className="flex flex-wrap flex-col text-right gap-1 capitalize">
                <Text asChild className="text-gray-700 dark:text-gray-50 ">
                  <strong>{customer?.name}</strong>
                </Text>

                <Text
                  asChild
                  className="text-xs text-gray-600 dark:text-gray-300"
                >
                  <span>{customer?.email.substring(0, 25)}...</span>
                </Text>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Receive
