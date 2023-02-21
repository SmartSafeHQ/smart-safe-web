import { Button } from '@/components/Button'
import { DialogModal } from '@/components/Dialogs/DialogModal'

import { useI18n } from '@hooks/useI18n'

type Props = {
  isOpen: boolean
  setToggleOpen: () => void
  customerWallet: string
}

export function SessionApproval({
  isOpen,
  setToggleOpen,
  customerWallet
}: Props) {
  const { t } = useI18n()

  return (
    <DialogModal.Root open={isOpen}>
      <DialogModal.Content className="md:max-w-[36rem] h-min">
        <div className="w-full h-full flex flex-col justify-between py-8 px-1 sm:py-4 sm:px-8 gap-6">
          <header className="w-full flex items-center flex-col gap-3">
            <DialogModal.Title className="text-3xl font-bold text-gray-800 dark:text-gray-50">
              {t.wc.sessionApprovalModal.header.title}
            </DialogModal.Title>

            <p className="text-center">
              {t.wc.sessionApprovalModal.header.description}
            </p>
          </header>

          <article className="flex flex-col gap-2 items-center justify-center">
            <p>{t.wc.sessionApprovalModal.content.walletLabel}</p>

            <span className="p-2 bg-gray-700 rounded-md">
              {customerWallet || '0x123456789123456789123456'}
            </span>
          </article>

          <footer className="flex gap-2">
            <Button
              onClick={setToggleOpen}
              className="bg-red-800 text-white hover:bg-red-700"
            >
              {t.wc.sessionApprovalModal.footer.rejectButtonTrigger}
            </Button>

            <Button>
              {t.wc.sessionApprovalModal.footer.approveButtonTrigger}
            </Button>
          </footer>
        </div>
      </DialogModal.Content>
    </DialogModal.Root>
  )
}
