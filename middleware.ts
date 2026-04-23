import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken')?.value;
  const userRole = request.cookies.get('userRole')?.value;

  // Protect /account routes — must be logged in
  if (pathname.startsWith('/account') && !accessToken) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Protect /admin routes — must be ADMIN or SUPERADMIN
  if (pathname.startsWith('/admin')) {
    if (!accessToken) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
    if (userRole !== 'ADMIN' && userRole !== 'SUPERADMIN') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/account/:path*', '/admin/:path*'],
};
