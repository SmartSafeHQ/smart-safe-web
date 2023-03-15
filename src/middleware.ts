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

    if (!isTokenValid) {
      const response = NextResponse.redirect(new URL('/', request.url))

      request.cookies.getAll().forEach(key => {
        if (!key.name.startsWith('CognitoIdentityServiceProvider')) {
          return
        }

        const cookie = request.cookies.get(key.name)

        if (cookie) {
          response.cookies.set(cookie.name, '', {
            expires: new Date()
          })

          response.cookies.delete(cookie.name)
        }
      })

      return response
    }

    if (accountsCase)
      return NextResponse.redirect(new URL('/dashboard/home', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/dashboard/:path*']
}
