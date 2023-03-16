import { toast } from 'react-toastify'

import { SupportedLanguages } from '@utils/global/constants/i18n'
import { pt } from '@/locales/pt'
import { locales } from '@/locales'

export const LAST_AUTH_COOKIE_NAME = '@InWallet.last-login'

export function formatSessionEmail(email: string) {
  const formattedEmail = email.replace(
    /(\w{3})[\w.-]+@(\w{1})[\w.-]+\.([\w.+]+\w)/,
    '$1***@$2***.$3'
  )

  return formattedEmail
}

export function createAuthCookieString(
  name: string,
  value: string,
  hours: number
) {
  const date = new Date()
  date.setTime(date.getTime() + hours * 60 * 60 * 1000) // Convert hours to milliseconds

  const expires = `expires=${date.toUTCString()}`

  document.cookie = `${name}=${value}; ${expires}; path=/`
}

export function isTokenValid(
  lastAuthDateISO: string,
  maxOfHoursToExpire: number
) {
  const authTime = new Date(lastAuthDateISO).getTime()
  const diffenceInMilliseconds = Math.abs(new Date().getTime() - authTime)
  const hoursActive = Math.ceil(diffenceInMilliseconds / (1000 * 60 * 60))

  return hoursActive <= maxOfHoursToExpire
}

export function getAuthErrorMessageWithToast(
  e: unknown,
  locale: SupportedLanguages
) {
  const error = e instanceof Error ? e : Error()

  const t = locales.get(locale)?.errors ?? pt.errors
  const errorMessage = t.authE.get(error.name)?.message

  toast.error(errorMessage ?? t.default)

  return errorMessage
}
