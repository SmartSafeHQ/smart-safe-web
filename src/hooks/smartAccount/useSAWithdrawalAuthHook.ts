import { useWithdrawalAuths } from '@hooks/smartAccount/queries/useWithdrawalAuths'
import { useAuth } from '@contexts/AuthContext'
import { useSAWithdrawalAuth } from '@contexts/SAWithdrawalAuthContext'
import { useI18n } from '@hooks/useI18n'

export const useSAWithdrawalAuthHook = () => {
  const { t } = useI18n()
  const { customer } = useAuth()
  const {
    isCreateWithdrawalOpen,
    setIsCreateWithdrawalOpen,
    isDeleteWithdrawalOpen,
    setIsDeleteWithdrawalOpen,
    selectedWithdrawal,
    setSelectedWithdrawal,
    handleDeleteWithdrawal
  } = useSAWithdrawalAuth()

  const {
    data: withdrawals,
    isLoading,
    error
  } = useWithdrawalAuths(
    customer?.id,
    customer?.wallets.evm.address ?? '',
    !!customer
  )

  return {
    t,
    customer,
    withdrawals,
    isLoading,
    error,
    isCreateWithdrawalOpen,
    setIsCreateWithdrawalOpen,
    isDeleteWithdrawalOpen,
    setIsDeleteWithdrawalOpen,
    selectedWithdrawal,
    setSelectedWithdrawal,
    handleDeleteWithdrawal
  }
}
