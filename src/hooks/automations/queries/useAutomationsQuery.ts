import { JsonRpcProvider, formatUnits } from 'ethers'
import { useQuery } from '@tanstack/react-query'

import { fetchContacts } from '@hooks/contacts/queries/useContactsQuery'
import { SelectedAutomationProps } from '@contexts/AutomationsContext'
import { queryClient } from '@lib/reactQuery'
import { formatWalletAddress } from '@utils/web3'
import { CHAINS_ATTRIBUTES } from '@utils/web3/chains/supportedChains'
import { RegisterUpkeep__factory as RegisterUpkeep } from '@utils/web3/typings/factories/RegisterUpkeep__factory'
import { SmartSafe__factory as SmartSafe } from '@utils/web3/typings/factories/SmartSafe__factory'
import { AUTOMATION_TIME_TRIGGERS } from '@utils/web3/transactions/transactionQueue'
import { SMART_SAFE_UPKEEP_ADRESSES } from '@utils/web3/chains/adresses'
import { TransactionManager } from '@utils/web3/typings/SmartSafe'

interface FetchAutomationsInput {
  safeAddress?: string
  chainId?: string
  walletAddress?: string
}

export async function fetchAutomations(
  input: FetchAutomationsInput
): Promise<SelectedAutomationProps[]> {
  if (!input.safeAddress || !input.chainId || !input.walletAddress) {
    throw new Error('safe address and chain required')
  }

  const safeChain = CHAINS_ATTRIBUTES.find(
    chain => chain.chainId === input.chainId
  )
  if (!safeChain) throw new Error('Chain not supported')

  const smartSafeUpKeepAddress = SMART_SAFE_UPKEEP_ADRESSES.get(
    safeChain.symbol
  )

  if (!smartSafeUpKeepAddress) throw new Error('Chain not supported')

  const contacts = await queryClient.ensureQueryData({
    queryKey: ['contacts', input.walletAddress],
    queryFn: () => fetchContacts({ walletAddress: input.walletAddress })
  })

  const provider = new JsonRpcProvider(safeChain.rpcUrl)
  const contract = SmartSafe.connect(input.safeAddress, provider)
  const upkeepContract = RegisterUpkeep.connect(
    smartSafeUpKeepAddress,
    provider
  )

  const scheduledTxResponse = await contract.getFunction('getTransactions')(
    0,
    2
  )
  const scheduledTx: TransactionManager.TransactionStructOutput[] = []

  scheduledTxResponse.forEach(transaction => scheduledTx.push(transaction))

  console.log(scheduledTx)

  const scheduledTxPromise = scheduledTx.map(async transaction => {
    const to = transaction[1]
    const nonce = Number(transaction[2])
    const timeTrigger = Number(transaction[7])
    const value = transaction[3]

    const scheduledTransaction = AUTOMATION_TIME_TRIGGERS.get(timeTrigger)

    if (!scheduledTransaction) {
      throw new Error('transaction schedule type not supported')
    }

    const response = await upkeepContract.getFunction('upKeepsPerSmartSafe')(
      input.safeAddress ?? '',
      nonce
    )

    const recipentContact = contacts.find(
      contact => contact.address === transaction.to
    )

    return {
      id: String(response),
      nonce,
      amount: Number(formatUnits(value, 'ether')),
      triggerTitle: scheduledTransaction.title,
      token: {
        symbol: safeChain.symbol,
        icon: safeChain.icon
      },
      wallet: {
        address: to,
        formattedAddress: formatWalletAddress(to)
      },
      recipientName: recipentContact?.name
    }
  })

  const formattedScheduledTx = await Promise.all(scheduledTxPromise)

  return formattedScheduledTx
}

export function useAutomationsQuery(
  safeAddress?: string,
  chainId?: string,
  walletAddress?: string,
  enabled = true
) {
  return useQuery({
    queryKey: ['scheduledAutomations', safeAddress],
    queryFn: () =>
      fetchAutomations({
        safeAddress,
        chainId,
        walletAddress
      }),
    enabled,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5 // 5 minutes
  })
}
