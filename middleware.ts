import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;

  const isProtectedRoute = request.nextUrl.pathname.startsWith('/dashboard');
  const isAuthRoute = request.nextUrl.pathname.startsWith('/auth/register');

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/register?tab=login', request.url));
  }

  if (isAuthRoute && token) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/me`,
        {
          method: 'GET',
          headers: {
            'Cookie': `accessToken=${token}`,
          },
          credentials: 'include',
        }
      );

      if (response.ok) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    } catch (error) {
      console.log('Token inválido, mantendo na página de auth');
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/auth/register/:path*',
  ],
}