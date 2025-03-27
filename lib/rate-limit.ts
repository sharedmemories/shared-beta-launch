import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

const redis = new Redis({
  url: process.env.REDIS_URL || '',
  token: process.env.REDIS_TOKEN || '',
});

// Create a new ratelimit instance that allows 5 requests per 60 seconds for OTP sending (by email)
export const sendOtpEmailLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '60 s'),
  analytics: true,
  prefix: 'ratelimit:send-otp:email',
});

// Create a new ratelimit instance that allows 10 requests per 60 seconds for OTP sending (by IP)
export const sendOtpIpLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '60 s'),
  analytics: true,
  prefix: 'ratelimit:send-otp:ip',
});

// Create a stricter rate limiter for verification attempts by email (10 attempts per 5 minutes)
export const verifyOtpEmailLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '5 m'),
  analytics: true,
  prefix: 'ratelimit:verify-otp:email',
});

// Create a stricter rate limiter for verification attempts by IP (20 attempts per 5 minutes)
export const verifyOtpIpLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(20, '5 m'),
  analytics: true,
  prefix: 'ratelimit:verify-otp:ip',
});

// Helper function to get a unique identifier from an email
export function getEmailIdentifier(email: string): string {
  return `email:${email.toLowerCase().trim()}`;
}

// Helper function to get a unique identifier from an IP
export function getIpIdentifier(ip: string): string {
  return `ip:${ip}`;
}

// Helper function to get client IP from request
export function getClientIp(request: Request): string {
  // Try to get IP from Vercel-specific headers
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  // Try to get IP from standard headers
  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  // Fallback to a placeholder if no IP can be determined
  return '127.0.0.1';
}
