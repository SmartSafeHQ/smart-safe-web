import Head from 'next/head'
import { QRCodeCanvas } from 'qrcode.react'
import { CopySimple, Export, Wallet } from 'phosphor-react'

import { Text } from '@components/Text'
import { useAuth } from '@contexts/AuthContext'
import { ActionButton } from '@components/pages/Receive/ActionButton'
import { LoadingState } from '@components/FetchingStates/LoadingState'
import { WalletInfos } from '@components/pages/Layouts/WalletInfos'
import { WalletsDropDownInput } from '@components/Inputs/WalletsDropDownInput'

import { useReceive } from '@hooks/receive/useReceive'
import { handleCopyToClipboardToastMessage } from '@utils/global'
import { useI18n } from '@hooks/useI18n'

const Receive = () => {
  const { customer } = useAuth()
  const {
    handleShareQrCode,
    coinsData,
    handleSelectWalletAccount,
    wallets,
    selectedWallet
  } = useReceive()
  const { t } = useI18n()

  return (
    <div className="w-full flex flex-col items-center justify-center px-2 pt-4">
      <Head>
        <title>{t.receive.headTitle}</title>
        <meta name="description" content={t.receive.headDescription} />
      </Head>

      <div className="w-full max-w-lg flex flex-1 flex-col">
        <div className="w-full flex items-center flex-col gap-3 mb-4">
          <div className="w-full flex items-center justify-start gap-2">
            <Text className="text-gray-700 dark:text-gray-50 text-xl font-semibold">
              {t.receive.scanTitle}
            </Text>
          </div>
        </div>

        <section className="w-full flex flex-col gap-4 items-stretch">
          <div className="w-full min-h-[20.5rem] flex flex-col gap-4 items-center justify-center p-6 rounded-md bg-gray-50 dark:bg-gray-800 shadow-md">
            {!customer && <LoadingState title={t.receive.loading} />}

            {customer && (
              <>
                <QRCodeCanvas value={selectedWallet.wallet} size={240} />

                <div className="flex flex-col items-center gap-2">
                  {coinsData && (
                    <WalletsDropDownInput
                      wallets={wallets}
                      onValueChange={handleSelectWalletAccount}
                    />
                  )}

                  {selectedWallet && <p>{selectedWallet.formattedWallet}</p>}
                </div>
              </>
            )}
          </div>

          <div className="w-full flex items-center justify-center gap-3">
            <ActionButton
              title={t.receive.copy}
              Icon={CopySimple}
              onClick={() =>
                handleCopyToClipboardToastMessage(
                  selectedWallet.wallet,
                  t.receive.copiedMessage
                )
              }
            />

            <ActionButton
              title={t.receive.share}
              Icon={Export}
              onClick={handleShareQrCode}
            />
          </div>

          <div className="pt-5 border-t-2 border-t-gray-300 dark:border-t-gray-700">
            <WalletInfos
              title={t.receive.destination}
              Icon={Wallet}
              className="p-5"
            >
              <Text asChild className="text-gray-700 dark:text-gray-50 ">
                <strong>{customer?.name}</strong>
              </Text>

              <Text
                asChild
                className="text-xs text-gray-600 dark:text-gray-300"
              >
                <span>{customer?.email.substring(0, 20)}...</span>
              </Text>
            </WalletInfos>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Receive
