import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the client IP address from headers
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');

  // Use the first IP from x-forwarded-for, or x-real-ip, or fallback to a default
  const clientIp = forwardedFor
    ? forwardedFor.split(',')[0].trim()
    : realIp
      ? realIp
      : '127.0.0.1';

  const response = NextResponse.next();

  // Add the IP to headers that will be accessible in API routes
  response.headers.set('x-real-ip', clientIp);

  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/api/check-rate-limit', '/api/send-email'],
};
