import { Button } from '@/components/Button'
import { DialogModal } from '@/components/Dialogs/DialogModal'

import { useI18n } from '@hooks/useI18n'

type Props = {
  isOpen: boolean
  setToggleOpen: () => void
  messageOptions: {
    blockchain:
      | 'Ethereum'
      | 'Polygon'
      | 'Avalanche'
      | 'Celo'
      | 'Binance Smart Chain'
    relayProtocol: 'wc'
    message: string
    methods: 'personal_sign' | 'signTypedData_v4'
  }
}

export function SignMessage({ isOpen, setToggleOpen, messageOptions }: Props) {
  const { t } = useI18n()

  return (
    <DialogModal.Root open={isOpen}>
      <DialogModal.Content className="md:max-w-[36rem] h-[74vh]">
        <div className="w-full h-full flex flex-col justify-between py-8 px-1 sm:py-4 sm:px-8 gap-6">
          <header className="w-full flex items-center flex-col gap-3">
            <DialogModal.Title className="text-3xl font-bold text-gray-800 dark:text-gray-50">
              {t.wc.signMessageModal.header.title}
            </DialogModal.Title>

            <p className="text-center">
              {t.wc.signMessageModal.header.description}
            </p>
          </header>

          <article className="flex flex-col gap-4">
            <div>
              <h2 className="font-bold">Blockchain</h2>
              <p className="text-gray-300">{messageOptions.blockchain}</p>
            </div>

            <div>
              <h2 className="font-bold">
                {t.wc.signMessageModal.content.protocol}
              </h2>
              <p className="text-gray-300">{messageOptions.relayProtocol}</p>
            </div>

            <div>
              <h2 className="font-bold">
                {t.wc.signMessageModal.content.message}
              </h2>
              <p className="text-gray-300">{messageOptions.message}</p>
            </div>

            <div>
              <h2 className="font-bold">
                {t.wc.signMessageModal.content.methods}
              </h2>
              <p className="text-gray-300">{messageOptions.methods}</p>
            </div>
          </article>

          <footer className="flex gap-2">
            <Button
              onClick={setToggleOpen}
              className="bg-red-800 text-white hover:bg-red-700"
            >
              {t.wc.signMessageModal.footer.rejectButtonTrigger}
            </Button>

            <Button>{t.wc.signMessageModal.footer.approveButtonTrigger}</Button>
          </footer>
        </div>
      </DialogModal.Content>
    </DialogModal.Root>
  )
}
