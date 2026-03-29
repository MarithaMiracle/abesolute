import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow the password page and API route through freely
  if (pathname.startsWith('/enter') || pathname.startsWith('/api/unlock')) {
    return NextResponse.next()
  }

  // Allow Next.js internals and static files through
  if (
  pathname.startsWith('/enter') ||
  pathname.startsWith('/api/unlock') ||
  pathname.startsWith('/checkin') ||
  pathname.startsWith('/admin')
) {
  return NextResponse.next()
}

  // Check for the unlocked cookie
  const unlocked = request.cookies.get('wedding_unlocked')?.value
  if (unlocked === 'true') {
    return NextResponse.next()
  }

  // Redirect to password page
  const url = request.nextUrl.clone()
  url.pathname = '/enter'
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}