export function formatSessionEmail(email: string) {
  const formattedEmail = email.replace(
    /(\w{3})[\w.-]+@(\w{1})[\w.-]+\.([\w.+]+\w)/,
    '$1***@$2***.$3'
  )

  return formattedEmail
}
