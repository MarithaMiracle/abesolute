import { NextResponse } from 'next/server'

const PASSWORD = 'TayoFeyi04'

export async function POST(request: Request) {
  const { password } = await request.json()

  if (password === PASSWORD) {
    const response = NextResponse.json({ success: true })
    response.cookies.set('wedding_unlocked', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      // Session cookie — expires when browser closes
      path: '/',
    })
    return response
  }

  return NextResponse.json({ success: false }, { status: 401 })
}