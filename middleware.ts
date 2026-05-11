import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;
  const userRole = request.cookies.get('userRole')?.value;
  const hasSession = Boolean(accessToken || refreshToken);

  // Protect /account routes — treat the refresh-token cookie as the real session source.
  if (pathname.startsWith('/account') && !hasSession) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Protect /admin routes — must be ADMIN or SUPERADMIN
  if (pathname.startsWith('/admin')) {
    if (!hasSession) {
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
