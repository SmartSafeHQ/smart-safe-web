export function formatSessionEmail(email: string) {
  const formattedEmail = email.replace(
    /(\w{3})[\w.-]+@(\w{1})[\w.-]+\.([\w.+]+\w)/,
    '$1***@$2***.$3'
  )

  return formattedEmail
}

export function isJwtTokenValid(token: string, maxOfHoursToExpire: number) {
  const tokenParts = token.split('.')

  if (tokenParts.length !== 3) {
    return false
  }

  const payload = JSON.parse(
    Buffer.from(tokenParts[1], 'base64').toString('utf-8')
  )

  const authTime = new Date(payload.auth_time * 1000).getTime()
  const diffenceInMilliseconds = Math.abs(new Date().getTime() - authTime)
  const hoursActive = Math.ceil(diffenceInMilliseconds / (1000 * 60 * 60))

  return hoursActive < maxOfHoursToExpire
}
