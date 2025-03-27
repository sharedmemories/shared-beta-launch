import { NextResponse } from "next/server"
import {
  sendOtpEmailLimiter,
  sendOtpIpLimiter,
  verifyOtpEmailLimiter,
  verifyOtpIpLimiter,
  getEmailIdentifier,
  getIpIdentifier,
  getClientIp,
} from "@/lib/rate-limit"

export async function POST(request: Request) {
  try {
    const { email, action } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Get client IP address
    const clientIp = getClientIp(request)

    // Generate identifiers for this email and IP
    const emailIdentifier = getEmailIdentifier(email)
    const ipIdentifier = getIpIdentifier(clientIp)

    // Get the appropriate rate limiters based on the action
    const emailLimiter = action === "verify" ? verifyOtpEmailLimiter : sendOtpEmailLimiter
    const ipLimiter = action === "verify" ? verifyOtpIpLimiter : sendOtpIpLimiter

    // Check if the request is rate limited by email
    const emailLimit = await emailLimiter.limit(emailIdentifier)

    // Check if the request is rate limited by IP
    const ipLimit = await ipLimiter.limit(ipIdentifier)

    // If running on Vercel Edge or similar environment, handle the pending promises
    // context.waitUntil(Promise.all([emailLimit.pending, ipLimit.pending]));

    // Use the most restrictive limit (the one with the earliest reset time or the one that failed)
    const isLimited = !emailLimit.success || !ipLimit.success
    const limitInfo = !emailLimit.success
      ? emailLimit
      : !ipLimit.success
        ? ipLimit
        : emailLimit.reset < ipLimit.reset
          ? emailLimit
          : ipLimit

    if (isLimited) {
      // Rate limit exceeded
      return NextResponse.json(
        {
          error: "Rate limit exceeded",
          limit: limitInfo.limit,
          remaining: limitInfo.remaining,
          reset: limitInfo.reset,
          source: !emailLimit.success ? "email" : "ip",
        },
        {
          status: 429,
          headers: {
            "Retry-After": Math.ceil((limitInfo.reset - Date.now()) / 1000).toString(),
            "X-RateLimit-Limit": limitInfo.limit.toString(),
            "X-RateLimit-Remaining": limitInfo.remaining.toString(),
            "X-RateLimit-Reset": limitInfo.reset.toString(),
          },
        },
      )
    }

    // Rate limit not exceeded
    return NextResponse.json({
      success: true,
      emailLimit: {
        limit: emailLimit.limit,
        remaining: emailLimit.remaining,
        reset: emailLimit.reset,
      },
      ipLimit: {
        limit: ipLimit.limit,
        remaining: ipLimit.remaining,
        reset: ipLimit.reset,
      },
    })
  } catch (error) {
    console.error("Error checking rate limit:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

