import { useMemo } from 'react'
import { useWallets } from '@web3-onboard/react'

import { useSafe } from '@contexts/SafeContext'
import { useGetOwners } from '@hooks/transactions/queries/useGetOwners'
import { useListContacts } from '@hooks/addressBook/queries/useListContacts'
import { useGetThreshold } from '@hooks/transactions/queries/useGetThreshold'
import { useGetOwnersCount } from '@hooks/transactions/queries/useGetOwnersCount'
import { useChangeThreshold } from '@hooks/transactions/mutation/useChangeThreshold'
import { useGetTransactionNonce } from '@hooks/transactions/queries/useGetTransactionNonce'

interface ChangeThrehsold {
  safeAddress: string
  newThreshold: number
  transactionNonce: number
}

export function useAccountManagementHook() {
  const { safe } = useSafe()
  const [wallets] = useWallets()
  const { data: contactList } = useListContacts(safe?.ownerId || '')
  const { data: transactionNonce } = useGetTransactionNonce({
    safeAddress: safe?.address || ''
  })
  const { data: ownersCount } = useGetOwnersCount({
    safeAddress: safe?.address || ''
  })
  const { data: safeThreshold } = useGetThreshold({
    safeAddress: safe?.address || ''
  })
  const { data: safeOwners } = useGetOwners({
    safeAddress: safe?.address || ''
  })
  const { mutateAsync: changeThresholdMutation } = useChangeThreshold()

  const richOwnersData = useMemo(() => {
    if (!contactList || !safeOwners || !wallets) {
      return [{ address: '', name: '' }]
    }

    return safeOwners.map(ownerAddress => {
      if (ownerAddress.toLowerCase() === wallets?.accounts[0].address) {
        return {
          address: ownerAddress,
          name: 'You'
        }
      }

      const ownerData = contactList.find(
        ({ contactAddress }) => contactAddress === ownerAddress
      )

      return {
        address: ownerData?.contactAddress || '',
        name: ownerData?.contactName || ''
      }
    })
  }, [contactList, safeOwners, wallets])

  async function changeThreshold({
    newThreshold,
    safeAddress,
    transactionNonce
  }: ChangeThrehsold) {
    try {
      await changeThresholdMutation({
        newThreshold,
        safeAddress,
        transactionNonce
      })
    } catch (err) {
      console.log(err)
    }
  }

  const isCurrentConnectWalletAnOwner = useMemo(() => {
    if (!wallets?.accounts?.[0]?.address || !safeOwners) {
      return false
    }

    const currentConnectedWallet = wallets.accounts[0].address

    return safeOwners.some(
      ownerAddress => ownerAddress.toLowerCase() === currentConnectedWallet
    )
  }, [wallets, safeOwners])

  return {
    safe,
    ownersCount,
    safeThreshold,
    richOwnersData,
    changeThreshold,
    transactionNonce,
    isCurrentConnectWalletAnOwner
  }
}
