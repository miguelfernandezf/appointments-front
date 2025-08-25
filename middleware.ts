import { NextRequest, NextResponse } from 'next/server'


export function middleware(request: NextRequest) {
  const token = request.cookies.get('jwt_token')?.value
  const isLoginPage = request.nextUrl.pathname === '/login'

  if (token && isLoginPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  const isProtectedRoute = request.nextUrl.pathname.startsWith('/dashboard')
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()

  // Fallback si request.url no es válida
  /*let redirectUrl: URL
  try {
    redirectUrl = new URL('/login', request.url)
  } catch (err) {
    console.error('Error creando URL de redirección:', err)
    // Usa una URL por defecto como respaldo
    redirectUrl = new URL('/login', process.env.LOCAL_URL)
  }

  if (!token) {
    return NextResponse.redirect(redirectUrl)
  }*/
}

export const config = {
  matcher: ['/login','/dashboard/:path*'],
}
