// app/api/auth/me/route.ts
import { cookies } from 'next/headers'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { NextResponse } from 'next/server'

interface CustomJwtPayload extends JwtPayload {
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'?: string
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'?: string
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'?: string
  avatar?: string
  menu?: string
}

export async function GET() {
  const cookieStore = cookies()
  const token = (await cookieStore).get('jwt_token')?.value

  if (!token) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!)as CustomJwtPayload | null
    console.log("🚀 ~ GET ~ decoded:", decoded)
    if (decoded != null) {
      const name = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
      const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
      const email = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress']
      const avatar = decoded['avatar']
      const menu = decoded['menu']
      return NextResponse.json({name, role, email, avatar, menu})
    }
  } catch (error) {
    return NextResponse.json({ error: 'Token inválido ' + error }, { status: 401 })
  }
}
