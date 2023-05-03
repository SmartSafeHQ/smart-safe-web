import dayjs from 'dayjs'
import { toast } from 'react-toastify'

export const LAST_AUTH_COOKIE_NAME = '@InWallet.last-login'
export const LINK_2FA_INFO =
  'https://www.microsoft.com/en-us/security/business/security-101/what-is-two-factor-authentication-2fa'

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
  if (!lastAuthDateISO) return false

  const lastVerifyAt = dayjs(lastAuthDateISO)
  const hoursSinceLastAuth = dayjs().diff(lastVerifyAt, 'hours')

  return hoursSinceLastAuth <= maxOfHoursToExpire
}

export function getAuthErrorMessageWithToast(e: unknown) {
  const errorMessage = (e as Error)?.message

  toast.error(errorMessage)

  return errorMessage
}
