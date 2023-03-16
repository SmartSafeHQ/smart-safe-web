import { ReactNode } from 'react'

import { Button } from '@components/Button'

import {
  Options,
  Verify2FAFunctionProps
} from '@hooks/settings/useSettingsSecurity/useSecuritySignIn2FA'
import { useI18n } from '@hooks/useI18n'
import { useSecurity2FA } from '@contexts/Security2FAContext'

interface Toggle2FAProps {
  isEnabled: boolean
  option: Options
  enableFunction: Verify2FAFunctionProps
  disableFunction: Verify2FAFunctionProps
  children?: ReactNode
}

export function Toggle2FA({
  isEnabled,
  option,
  children,
  enableFunction,
  disableFunction
}: Toggle2FAProps) {
  const { handleDisableTOTP, handleSetupTOTP } = useSecurity2FA()
  const { t } = useI18n()

  return (
    <div className="flex items-start gap-4">
      {isEnabled ? (
        <Button
          className="w-min max-w-[5rem] !py-2 text-xs"
          variant="red"
          onClick={() =>
            handleDisableTOTP(option, enableFunction, disableFunction)
          }
        >
          {t.settings.security.disable}
        </Button>
      ) : (
        <Button
          className="w-min !px-3 !py-2 text-xs"
          onClick={() =>
            handleSetupTOTP(option, enableFunction, disableFunction)
          }
        >
          {t.settings.security.enable}
        </Button>
      )}

      {children}
    </div>
  )
}
