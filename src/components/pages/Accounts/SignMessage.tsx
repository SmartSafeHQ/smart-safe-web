import { Dispatch, SetStateAction } from 'react'
import { SignClient } from '@walletconnect/sign-client'
import { toast } from 'react-toastify'
import LegacySignClient from '@walletconnect/client'
import { ISignClient } from '@walletconnect/types'
import { formatJsonRpcError } from '@json-rpc-tools/utils'
import { getSdkError } from '@walletconnect/utils'

import { Avatar } from '@components/Avatar'
import { Button } from '@components/Button'
import { DialogModal } from '@components/Dialogs/DialogModal'
import { Text } from '@components/Text'

import { useI18n } from '@hooks/useI18n'
import { SessionDataProps } from '@hooks/accounts/useWcLogin'

interface SignMessageProps {
  appName?: string
  avatar?: string
  url?: string
  customerName?: string
  signClient?: ISignClient | LegacySignClient
  sessionSignData: SessionDataProps | null
  isOpen: boolean
  setSessionSignData: Dispatch<SetStateAction<SessionDataProps | null>>
}

export function SignMessage({
  appName,
  sessionSignData,
  avatar,
  url,
  customerName,
  isOpen,
  signClient,
  setSessionSignData
}: SignMessageProps) {
  const { t } = useI18n()

  async function handleApprove() {
    try {
      if (signClient instanceof LegacySignClient) {
        signClient.approveRequest({
          id: sessionSignData?.id,
          result: sessionSignData?.signResponse.result
        })
      }

      if (signClient instanceof SignClient && sessionSignData) {
        await signClient.respond({
          topic: sessionSignData.topic,
          response: sessionSignData?.signResponse
        })
      }
    } catch (error) {
      console.log(error)

      toast.error(`Error. ${(error as Error).message}`)
    }

    setSessionSignData(prev => {
      if (!prev) return null

      return { ...prev, isModalOpen: false }
    })
  }

  async function handleReject() {
    if (!sessionSignData) return

    try {
      if (signClient instanceof LegacySignClient) {
        const { error } = formatJsonRpcError(
          sessionSignData.id,
          getSdkError('USER_REJECTED_METHODS').message
        )

        signClient.rejectRequest({
          id: sessionSignData.id,
          error
        })
      }

      if (signClient instanceof SignClient) {
        const response = formatJsonRpcError(
          sessionSignData.id,
          getSdkError('USER_REJECTED_METHODS').message
        )

        await signClient.respond({
          topic: sessionSignData.topic,
          response
        })
      }
    } catch (error) {
      console.log(error)

      toast.error(`Error. ${(error as Error).message}`)
    }

    setSessionSignData(prev => {
      if (!prev) return null

      return { ...prev, isModalOpen: false }
    })
  }

  return (
    <DialogModal.Root open={isOpen}>
      <DialogModal.Content className="md:max-w-[30rem]">
        <div className="w-full h-full flex flex-col gap-6 p-2">
          <header className="w-full flex items-center flex-col gap-3">
            <DialogModal.Title className="text-3xl font-bold text-gray-800 dark:text-gray-50">
              {t.wc.signMessage.title}
            </DialogModal.Title>

            <DialogModal.Description className="text-center text-gray-600 dark:text-gray-400">
              {customerName}, {t.wc.signMessage.description}
            </DialogModal.Description>
          </header>

          <div className="flex flex-col gap-4">
            <article className="w-full flex gap-4 items-center pb-6 border-b-2 border-gray-500">
              <Avatar.Root
                fallbackName={appName?.substring(0, 2) ?? 'TK'}
                className="min-w-[3.25rem] h-[3.25rem]"
              >
                <Avatar.Image src={avatar} alt={appName} />
              </Avatar.Root>

              <div className="flex flex-col items-start">
                <Text
                  asChild
                  className="capitalize text-lg text-gray-900 dark:text-gray-50"
                >
                  <strong>{appName ?? t.wc.uninformed}</strong>
                </Text>

                <Text
                  asChild
                  className="text-cyan-500 font-medium transition-colors hover:text-cyan-600"
                >
                  <a href={url ?? '#'} target="_blank" rel="noreferrer">
                    {url ?? t.wc.uninformed}
                  </a>
                </Text>
              </div>
            </article>

            <article className="w-full flex flex-col gap-1 pb-6 border-b-2 border-gray-500">
              <Text
                asChild
                className="capitalize text-lg text-gray-800 dark:text-gray-50"
              >
                <strong>{t.wc.signMessage.blockchain}</strong>
              </Text>

              <Text
                asChild
                className="text-start capitalize text-gray-600 dark:text-gray-400"
              >
                <p>{sessionSignData?.blockchains}</p>
              </Text>
            </article>

            <article className="w-full flex flex-col gap-1">
              <Text
                asChild
                className="capitalize text-lg text-gray-800 dark:text-gray-50"
              >
                <strong>{t.wc.signMessage.message}</strong>
              </Text>

              <Text
                asChild
                className="text-start text-gray-600 dark:text-gray-400"
              >
                <p>{sessionSignData?.message}</p>
              </Text>
            </article>
          </div>

          <footer className="flex gap-2 mt-auto">
            <Button onClick={handleReject} variant="red">
              {t.wc.signMessage.rejectButton}
            </Button>

            <Button onClick={handleApprove}>
              {t.wc.signMessage.approveButton}
            </Button>
          </footer>
        </div>
      </DialogModal.Content>
    </DialogModal.Root>
  )
}
