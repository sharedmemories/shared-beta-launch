"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { HistoryIcon, RefreshCw } from "lucide-react"
import OtpVerification from "./otp-verification"

// This is a mock of the better-auth client
// Replace with your actual better-auth implementation
const authClient = {
  signIn: {
    emailOtp: async ({ email, otp }: { email: string; otp: string }) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return { data: { user: { email } }, error: null }
    },
  },
  signUp: {
    emailOtp: async ({ email }: { email: string }) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return { data: { user: null }, error: null }
    },
  },
}

export default function SignInFlow() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [step, setStep] = useState<"email" | "otp">("email")
  const [isSending, setIsSending] = useState(false)

  const handleSendCode = async () => {
    setIsSending(true)
    try {
      // Send OTP to the user's email
      const { error } = await authClient.signUp.emailOtp({ email })

      if (error) {
        console.error("Error sending OTP:", error)
        return
      }

      // Move to OTP verification step
      setStep("otp")
    } catch (error) {
      console.error("Error sending OTP:", error)
    } finally {
      setIsSending(false)
    }
  }

  const handleVerifyOtp = async (otp: string) => {
    try {
      // Verify OTP and sign in the user
      const { data, error } = await authClient.signIn.emailOtp({
        email,
        otp,
      })

      if (error) {
        console.error("Error verifying OTP:", error)
        return
      }

      // Redirect to dashboard or home page after successful sign-in
      router.push("/dashboard")
    } catch (error) {
      console.error("Error verifying OTP:", error)
    }
  }

  const handleResendOtp = async () => {
    try {
      // Resend OTP to the user's email
      const { error } = await authClient.signUp.emailOtp({ email })

      if (error) {
        console.error("Error resending OTP:", error)
      }
    } catch (error) {
      console.error("Error resending OTP:", error)
    }
  }

  if (step === "otp") {
    return (
      <OtpVerification
        email={email}
        onVerify={handleVerifyOtp}
        onResend={handleResendOtp}
        onBack={() => setStep("email")}
      />
    )
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-sm">
      <div className="mb-6">
        <Button variant="ghost" size="sm" className="p-0 h-8 text-gray-500">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-1"
          >
            <path
              d="M19 12H5M5 12L12 19M5 12L12 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          LLMConsole
        </Button>
      </div>

      <div className="flex flex-col items-center mb-6">
        <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M3 8L10.8906 13.2604C11.5624 13.7083 12.4376 13.7083 13.1094 13.2604L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 className="text-xl font-semibold">Sign In</h1>
        <p className="text-sm text-gray-500 mt-2">
          Don't have an account?{" "}
          <a href="#" className="text-gray-600 hover:underline">
            Sign up
          </a>
          .
        </p>
      </div>

      <div className="mb-6">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your work email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border-gray-300"
        />
      </div>

      <div className="flex gap-2 mb-6">
        <Button
          className="flex-1 bg-black text-white hover:bg-gray-800"
          onClick={handleSendCode}
          disabled={!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || isSending}
        >
          {isSending ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Sending...
            </>
          ) : (
            "Send me a magic link"
          )}
        </Button>

        <Button variant="outline" className="px-3">
          <HistoryIcon className="h-4 w-4" />
          <span className="sr-only">Last used</span>
        </Button>
      </div>

      <div className="text-center mb-6">
        <a href="#" className="text-sm text-gray-600 hover:underline">
          Sign in using password
        </a>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500">OR CONTINUE WITH</span>
        </div>
      </div>

      <Button variant="outline" className="w-full mb-6 flex items-center justify-center gap-2">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Sign in with Google
      </Button>

      <div className="text-xs text-center text-gray-500">
        <p>
          New accounts are subject to LLMConsole's
          <br />
          <a href="#" className="text-gray-600 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-gray-600 hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  )
}

