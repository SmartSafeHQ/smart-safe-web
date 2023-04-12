import { utils } from 'ethers'

import { Button } from '@components/Button'
import { TextInput } from '@components/Inputs/TextInput'

import { useSelectSellCoin } from '@hooks/buyAndSell/sell/useSelectSellCoin'
import { BANKS } from '@hooks/buyAndSell/sell/useBankAccountSell'
import { useSellStableCoin } from '@contexts/SellStableCoinContext'
import { useBurnStableCoin } from '@hooks/buyAndSell/mutations/useSellStableCoin'

export function SellDataConfirmationSection() {
  const { withdrawAmount, bankAccount } = useSellStableCoin()
  const { t, customer, selectedStableCoin } = useSelectSellCoin()
  const { mutateAsync: burnStableCoin, isLoading } = useBurnStableCoin()

  async function handleSell() {
    const amountToWithdrawInWei = utils
      .parseEther(String(withdrawAmount))
      .toString()

    console.log(amountToWithdrawInWei)

    await burnStableCoin({
      userAddress: customer?.wallets.evm.address || '',
      amount: amountToWithdrawInWei,
      contractAddress: selectedStableCoin.contractAddress
    })
  }

  return (
    <section className="w-full max-w-lg flex flex-1 flex-col gap-2 items-stretch">
      <TextInput.Root htmlFor="bankId">
        <TextInput.Label>{t.sell.inputs.bank.label}</TextInput.Label>

        <TextInput.Content>
          <TextInput.Input
            readOnly
            disabled
            value={
              BANKS.find(({ bankId }) => bankId === bankAccount?.bankId)?.name
            }
          />
        </TextInput.Content>
      </TextInput.Root>

      <TextInput.Root htmlFor="cpf">
        <TextInput.Label>{t.sell.inputs.cpf.label}</TextInput.Label>

        <TextInput.Content>
          <TextInput.Input readOnly disabled value={bankAccount?.cpf} />
        </TextInput.Content>
      </TextInput.Root>

      <TextInput.Root htmlFor="name">
        <TextInput.Label>{t.sell.inputs.name.label}</TextInput.Label>

        <TextInput.Content>
          <TextInput.Input readOnly disabled value={bankAccount?.name} />
        </TextInput.Content>
      </TextInput.Root>

      <TextInput.Root htmlFor="branch">
        <TextInput.Label>{t.sell.inputs.branch.label}</TextInput.Label>

        <TextInput.Content>
          <TextInput.Input readOnly disabled value={bankAccount?.branch} />
        </TextInput.Content>
      </TextInput.Root>

      <div className="flex gap-2">
        <TextInput.Root htmlFor="accountNumber">
          <TextInput.Label>{t.sell.inputs.accountNumber.label}</TextInput.Label>

          <TextInput.Content>
            <TextInput.Input
              readOnly
              disabled
              value={bankAccount?.accountNumber}
            />
          </TextInput.Content>
        </TextInput.Root>

        <TextInput.Root htmlFor="lastDigit">
          <TextInput.Label>{t.sell.inputs.lastDigit.label}</TextInput.Label>

          <TextInput.Content>
            <TextInput.Input readOnly disabled value={bankAccount?.lastDigit} />
          </TextInput.Content>
        </TextInput.Root>
      </div>

      <Button onClick={handleSell} isLoading={isLoading}>
        {t.sell.checkout}
      </Button>
    </section>
  )
}
