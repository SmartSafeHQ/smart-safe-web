import type { NextRequest } from 'next/server'

import { NextResponse } from 'next/server'

import { isJwtTokenValid } from '@utils/sessionsUtils'

export async function middleware(request: NextRequest) {
  const noAuthCheckCase = ['/accounts/wc', '/privacy', '/en/privacy'].some(
    path => path === request.nextUrl.pathname
  )

  if (noAuthCheckCase) return NextResponse.next()

  const accountsCase = request.nextUrl.pathname === '/'

  const authToken = request.cookies
    .getAll()
    .find(key =>
      new RegExp(
        `CognitoIdentityServiceProvider\\.${process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID}\\..+\\.idToken`
      ).test(key.name)
    )?.value

  if (!authToken && !accountsCase)
    return NextResponse.redirect(new URL('/', request.url))

  if (authToken) {
    const isTokenValid = isJwtTokenValid(authToken, 5)

    if (!isTokenValid) return NextResponse.redirect(new URL('/', request.url))

    if (accountsCase)
      return NextResponse.redirect(new URL('/dashboard/home', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/dashboard/:path*']
}
