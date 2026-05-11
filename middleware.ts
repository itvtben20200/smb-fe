import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken')?.value;
  const userRole = request.cookies.get('userRole')?.value;
  // accessToken expires in 15 min; userRole is set for 7 days and cleared on logout.
  // Both live on the frontend domain so middleware can always read them.
  // (refreshToken is httpOnly on the backend domain and is not visible here.)
  const hasSession = Boolean(accessToken || userRole);

  // Protect /account routes
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
