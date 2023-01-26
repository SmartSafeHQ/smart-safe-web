import type { NextRequest } from 'next/server'

import { NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const accountsCase = request.nextUrl.pathname === '/'

  const tokenKey = request.cookies
    .getAll()
    .find(key =>
      new RegExp(
        `CognitoIdentityServiceProvider\\.${process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID}\\..+\\.idToken`
      ).test(key.name)
    )

  if (tokenKey && request.cookies.get(tokenKey) && accountsCase) {
    return NextResponse.redirect(new URL('/dashboard/home', request.url))
  }

  if (!tokenKey && !accountsCase)
    return NextResponse.redirect(new URL('/', request.url))

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!.*\\.|api|fonts|500|400|_next/static\\/).*)']
}
