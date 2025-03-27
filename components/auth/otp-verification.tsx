'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { Button } from '@/components/ui/button';
import { ArrowLeft, LockKeyhole, RefreshCw } from 'lucide-react';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { toast } from 'sonner';

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
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [attempts, setAttempts] = useState(0);
  const MAX_ATTEMPTS = 5;

  useEffect(() => {
    // Start countdown timer when component mounts
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const handleVerify = async () => {
    if (otp.length !== 6) return;

    setIsVerifying(true);
    try {
      // Track verification attempts
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      // Show warning if approaching max attempts
      if (newAttempts === MAX_ATTEMPTS - 1) {
        toast('You have 1 attempt remaining before temporary lockout.');
      }

      await onVerify(otp);
    } catch (error) {
      console.error('Verification failed:', error);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      await onResend();
      setTimeLeft(30);

      // Reset OTP field when resending
      setOtp('');

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
      console.error('Resend failed:', error);
    } finally {
      setIsResending(false);
    }
  };

  // Auto-submit when OTP is fully entered
  useEffect(() => {
    if (otp.length === 6 && !isVerifying) {
      handleVerify();
    }
  }, [otp]);

  return (
    <div className="mx-auto w-full max-w-md rounded-lg bg-white p-6 shadow-sm">
      <div className="mb-6">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 p-0 text-gray-500"
          onClick={onBack}
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="mb-6 flex flex-col items-center">
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
          <LockKeyhole />
        </div>
        <h1 className="text-center text-xl font-semibold">Verify your email</h1>
        <p className="mt-2 text-center text-sm text-gray-500">
          We've sent a code to {email}
        </p>
      </div>

      <div className="mb-6">
        <div className="mb-4 flex justify-center">
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={setOtp}
            pattern={REGEXP_ONLY_DIGITS}
            containerClassName="gap-2"
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} className="h-12 w-12" />
              <InputOTPSlot index={1} className="h-12 w-12" />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={2} className="h-12 w-12" />
              <InputOTPSlot index={3} className="h-12 w-12" />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={4} className="h-12 w-12" />
              <InputOTPSlot index={5} className="h-12 w-12" />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Button
          className="w-full"
          onClick={handleVerify}
          disabled={otp.length !== 6 || isVerifying}
        >
          {isVerifying ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Verifying...
            </>
          ) : (
            'Verify'
          )}
        </Button>
      </div>

      <div className="text-center">
        <p className="mb-2 text-sm text-gray-500">Didn't receive a code?</p>
        <Button
          variant="link"
          onClick={handleResend}
          disabled={isResending || timeLeft > 0}
          className="text-sm font-medium"
        >
          {isResending ? (
            <>
              <RefreshCw className="mr-2 h-3 w-3 animate-spin" />
              Resending...
            </>
          ) : timeLeft > 0 ? (
            `Resend code in ${timeLeft}s`
          ) : (
            'Resend code'
          )}
        </Button>
      </div>

      <div className="mt-8 text-center text-xs text-gray-500">
        <p>
          By signing in your agree to Shared Memories'
          <br />
          <Link href="/terms" className="hover:underline">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
