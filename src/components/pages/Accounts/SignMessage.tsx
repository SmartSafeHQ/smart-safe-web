import { Avatar } from '@components/Avatar'
import { Button } from '@components/Button'
import { DialogModal } from '@components/Dialogs/DialogModal'
import { Text } from '@components/Text'

import { useI18n } from '@hooks/useI18n'

type Props = {
  appName: string
  message: string
  blockchain: string
  avatar: string
  url: string
  customerName?: string
  isOpen: boolean
  setIsOpen: () => void
}

export function SignMessage({
  appName,
  message,
  avatar,
  blockchain,
  url,
  customerName,
  isOpen,
  setIsOpen
}: Props) {
  const { t } = useI18n()

  return (
    <DialogModal.Root open={isOpen}>
      <DialogModal.Content className="md:max-w-[30rem] min-h-[86vh]">
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
                <p>{blockchain}</p>
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
                <p>{message}</p>
              </Text>
            </article>
          </div>

          <footer className="flex gap-2 mt-auto">
            <Button onClick={setIsOpen} variant="red">
              {t.wc.signMessage.rejectButton}
            </Button>

            <Button>{t.wc.signMessage.approveButton}</Button>
          </footer>
        </div>
      </DialogModal.Content>
    </DialogModal.Root>
  )
}
