import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const username = request.cookies.get('username')?.value
  console.log('cookie :>> ', username)
  console.log('request.url :>> ', request.nextUrl.pathname)
  if (username && !request.nextUrl.pathname.startsWith('/app')) {
    return NextResponse.redirect(new URL('/app', request.url))
  }
  if (!username && !request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  console.log('do nothing')
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next|favicon.ico).*)',
  ],
}
