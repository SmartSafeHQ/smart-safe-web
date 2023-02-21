import { Wallet } from 'phosphor-react'

import { Avatar } from '@components/Avatar'
import { Button } from '@components/Button'
import { Text } from '@components/Text'
import { DialogModal } from '@components/Dialogs/DialogModal'
import { WalletInfos } from '@components/pages/Layouts/WalletInfos'

import { useI18n } from '@hooks/useI18n'

type Props = {
  appName: string
  description: string
  avatar: string
  url: string
  customerName?: string
  customerWallet?: string
  isOpen: boolean
  setIsOpen: () => void
}

export function SessionApproval({
  appName,
  description,
  avatar,
  url,
  customerName,
  customerWallet,
  isOpen,
  setIsOpen
}: Props) {
  const { t } = useI18n()

  return (
    <DialogModal.Root open={isOpen}>
      <DialogModal.Content className="md:max-w-[30rem] min-h-[67vh]">
        <div className="w-full h-full flex flex-col gap-6 p-2">
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
                fallbackName={appName.substring(0, 2)}
                className="min-w-[3.25rem] h-[3.25rem]"
              >
                <Avatar.Image src={avatar} alt={appName} />
              </Avatar.Root>

              <div className="flex flex-col items-start">
                <Text
                  asChild
                  className="capitalize text-lg text-gray-900 dark:text-gray-50"
                >
                  <strong>{appName}</strong>
                </Text>

                <Text
                  asChild
                  className="text-cyan-500 font-medium transition-colors hover:text-cyan-600"
                >
                  <a href={url} target="_blank" rel="noreferrer">
                    {url}
                  </a>
                </Text>
              </div>
            </article>

            <article className="w-full flex flex-col gap-5">
              <Text
                asChild
                className="text-justify text-gray-600 dark:text-gray-400"
              >
                <p>{description}</p>
              </Text>

              <WalletInfos
                title={t.wc.sessionApproval.wallet}
                Icon={Wallet}
                className="p-4 !bg-gray-200 dark:!bg-gray-700"
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
            <Button onClick={setIsOpen} variant="red">
              {t.wc.sessionApproval.rejectButton}
            </Button>

            <Button>{t.wc.sessionApproval.approveButton}</Button>
          </footer>
        </div>
      </DialogModal.Content>
    </DialogModal.Root>
  )
}
