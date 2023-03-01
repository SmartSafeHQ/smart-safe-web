import { Dispatch, SetStateAction } from 'react'
import { Wallet } from 'phosphor-react'
import LegacySignClient from '@walletconnect/client'
import { SignClient } from '@walletconnect/sign-client'
import { ISignClient, SessionTypes } from '@walletconnect/types'
import { toast } from 'react-toastify'

import { Avatar } from '@components/Avatar'
import { Button } from '@components/Button'
import { Text } from '@components/Text'
import { DialogModal } from '@components/Dialogs/DialogModal'
import { WalletInfos } from '@components/pages/Layouts/WalletInfos'

import { useI18n } from '@hooks/useI18n'
import { ApproveSessionDataProps } from '@hooks/accounts/useWcLogin'
import { getSdkError } from '@walletconnect/utils'

interface SessionApprovalProps {
  sessionData: ApproveSessionDataProps | null
  customerName?: string
  customerWallet?: string
  signClient?: ISignClient | LegacySignClient
  isOpen: boolean
  setSessionData: Dispatch<SetStateAction<ApproveSessionDataProps | null>>
}

export function SessionApproval({
  signClient,
  sessionData,
  customerName,
  customerWallet,
  isOpen,
  setSessionData
}: SessionApprovalProps) {
  const { t } = useI18n()

  async function handleApprove() {
    if (!customerWallet) return

    try {
      if (signClient instanceof LegacySignClient) {
        signClient.approveSession({
          accounts: [customerWallet],
          chainId: sessionData?.chainId ?? 1
        })
      }

      if (signClient instanceof SignClient) {
        if (!sessionData?.v2Params) return

        const { requiredNamespaces, relays } = sessionData.v2Params

        const namespaces: SessionTypes.Namespaces = {}

        Object.keys(requiredNamespaces).forEach(key => {
          const accounts: string[] = []

          requiredNamespaces[key]?.chains?.forEach(chain => {
            accounts.push(`${chain}:${customerWallet}`)
          })

          namespaces[key] = {
            accounts,
            methods: requiredNamespaces[key].methods,
            events: requiredNamespaces[key].events
          }
        })

        const { acknowledged } = await signClient.approve({
          id: sessionData.id,
          relayProtocol: relays[0].protocol,
          namespaces
        })

        await acknowledged()
      }
    } catch (error) {
      console.log(error)

      toast.error(`Error. ${(error as Error).message}`)
    }

    setSessionData(prev => {
      if (!prev) return null

      return { ...prev, isModalOpen: false }
    })
  }

  async function handleReject() {
    try {
      if (signClient instanceof LegacySignClient) {
        signClient.rejectSession(getSdkError('USER_REJECTED_METHODS'))
      }

      if (signClient instanceof SignClient) {
        await signClient.reject({
          id: sessionData?.id ?? 0,
          reason: getSdkError('USER_REJECTED_METHODS')
        })
      }
    } catch (error) {
      console.log(error)

      toast.error(`Error. ${(error as Error).message}`)
    }

    setSessionData(prev => {
      if (!prev) return null

      return { ...prev, isModalOpen: false }
    })
  }

  return (
    <DialogModal.Root open={isOpen}>
      <DialogModal.Content className="md:max-w-[30rem]">
        <div className="w-full h-full flex flex-col gap-6 ">
          <header className="w-full flex items-center flex-col gap-3">
            <DialogModal.Title className="text-3xl font-bold text-gray-800 dark:text-gray-50">
              {t.wc.sessionApproval.title}
            </DialogModal.Title>

            <DialogModal.Description className="text-center text-gray-600 dark:text-gray-400">
              {t.wc.sessionApproval.description}
            </DialogModal.Description>
          </header>

          <div className="flex flex-col gap-4">
            <article className="w-full flex gap-4 items-center pb-6 border-b-2 border-gray-500">
              <Avatar.Root
                fallbackName={sessionData?.name?.substring(0, 2) ?? 'in'}
                className="min-w-[3.25rem] h-[3.25rem]"
              >
                <Avatar.Image
                  src={sessionData?.avatarUrl}
                  alt={sessionData?.name}
                />
              </Avatar.Root>

              <div className="flex flex-col items-start">
                <Text
                  asChild
                  className="capitalize text-lg text-gray-900 dark:text-gray-50"
                >
                  <strong>{sessionData?.name ?? t.wc.uninformed}</strong>
                </Text>

                <Text
                  asChild
                  className="text-cyan-500 font-medium transition-colors hover:text-cyan-600"
                >
                  <a
                    href={sessionData?.url ?? '#'}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {sessionData?.url ?? t.wc.uninformed}
                  </a>
                </Text>
              </div>
            </article>

            <article className="w-full flex flex-col gap-5">
              <Text
                asChild
                className="text-justify text-gray-600 dark:text-gray-400"
              >
                <p>{sessionData?.description ?? t.wc.uninformed}</p>
              </Text>

              <WalletInfos
                title={t.wc.sessionApproval.wallet}
                Icon={Wallet}
                className="p-4"
                variant="highlighted"
              >
                <Text asChild className="text-gray-700 dark:text-gray-50 ">
                  <strong>{customerName}</strong>
                </Text>

                <Text
                  asChild
                  className="text-xs text-gray-600 dark:text-gray-300"
                >
                  <span>{`${customerWallet?.slice(
                    0,
                    6
                  )}...${customerWallet?.slice(-6)}`}</span>
                </Text>
              </WalletInfos>
            </article>
          </div>

          <footer className="flex gap-2 mt-auto">
            <Button onClick={handleReject} variant="red">
              {t.wc.sessionApproval.rejectButton}
            </Button>

            <Button onClick={handleApprove}>
              {t.wc.sessionApproval.approveButton}
            </Button>
          </footer>
        </div>
      </DialogModal.Content>
    </DialogModal.Root>
  )
}
