"use client";

import Link from "next/link";
import { useState } from "react";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface OtpVerificationProps {
  email: string;
  onVerify: (otp: string) => Promise<void>;
  onResend: () => Promise<void>;
  onBack: () => void;
}

export default function OtpVerification({
  email,
  onVerify,
  onResend,
  onBack,
}: OtpVerificationProps) {
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  const handleVerify = async () => {
    if (otp.length !== 6) return;

    setIsVerifying(true);
    try {
      await onVerify(otp);
    } catch (error) {
      console.error("Verification failed:", error);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      await onResend();
      setTimeLeft(30);

      // Start countdown timer
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      console.error("Resend failed:", error);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-sm">
      <div className="mb-6">
        <Button
          variant="ghost"
          size="sm"
          className="p-0 h-8 text-gray-500"
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
      </div>

      <div className="flex flex-col items-center mb-6">
        <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V13C20 11.8954 19.1046 11 18 11H6C4.89543 11 4 11.8954 4 13V19C4 20.1046 4.89543 21 6 21ZM16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11H16Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 className="text-xl font-semibold text-center">Verify your email</h1>
        <p className="text-sm text-gray-500 text-center mt-2">
          We've sent a code to {email}
        </p>
      </div>

      <div className="mb-6">
        <div className="flex justify-center mb-4">
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={setOtp}
            pattern={REGEXP_ONLY_DIGITS}
            containerClassName="gap-2"
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} className="w-12 h-12" />
              <InputOTPSlot index={1} className="w-12 h-12" />
              <InputOTPSlot index={2} className="w-12 h-12" />
              <InputOTPSlot index={3} className="w-12 h-12" />
              <InputOTPSlot index={4} className="w-12 h-12" />
              <InputOTPSlot index={5} className="w-12 h-12" />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Button
          className="w-full bg-black text-white hover:bg-gray-800"
          onClick={handleVerify}
          disabled={otp.length !== 6 || isVerifying}
        >
          {isVerifying ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Verifying...
            </>
          ) : (
            "Verify"
          )}
        </Button>
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-500 mb-2">Didn't receive a code?</p>
        <Button
          variant="link"
          onClick={handleResend}
          disabled={isResending || timeLeft > 0}
          className="text-sm font-medium"
        >
          {isResending ? (
            <>
              <RefreshCw className="h-3 w-3 mr-2 animate-spin" />
              Resending...
            </>
          ) : timeLeft > 0 ? (
            `Resend code in ${timeLeft}s`
          ) : (
            "Resend code"
          )}
        </Button>
      </div>

      <div className="mt-8 text-xs text-center text-gray-500">
        <p>
          New accounts are subject to LLMConsole's
          <br />
          <Link href="/terms" className="text-gray-600 hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-gray-600 hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
