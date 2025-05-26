import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;

  const isProtectedRoute = request.nextUrl.pathname.startsWith('/dashboard');

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/register?tab=login', request.url));
  }

  if (!isProtectedRoute && token && request.nextUrl.pathname.startsWith('/register')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}