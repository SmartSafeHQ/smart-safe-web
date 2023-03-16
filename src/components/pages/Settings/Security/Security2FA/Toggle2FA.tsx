import { Button } from '@components/Button'
import { Security2FASection } from './Security2FASection'
import {
  Options,
  Verify2FAFunctionProps
} from '@components/pages/Settings/Security'

import { useI18n } from '@hooks/useI18n'

interface Toggle2FAProps {
  isEnabled: boolean
  option: Options
  enableFunction: Verify2FAFunctionProps
  disableFunction: Verify2FAFunctionProps
  handleSetupTOTP(
    _option: Options,
    _enableFunction: Verify2FAFunctionProps,
    _disableFunction: Verify2FAFunctionProps
  ): Promise<void>
  handleDisableTOTP(
    _option: Options,
    _enableFunction: Verify2FAFunctionProps,
    _disableFunction: Verify2FAFunctionProps
  ): Promise<void>
}

export function Toggle2FA({
  isEnabled,
  option,
  enableFunction,
  disableFunction,
  handleSetupTOTP,
  handleDisableTOTP
}: Toggle2FAProps) {
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

      <div className="w-full max-w-2xl flex flex-col items-start justify-start">
        <strong className="font-semibold text-left">
          {t.settings.security.signIn}
        </strong>

        <Security2FASection.Description>
          {t.settings.security.signInDescription}
        </Security2FASection.Description>
      </div>
    </div>
  )
}
