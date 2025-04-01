'use client';

import { toast } from 'sonner';
import { useState, useEffect } from 'react';
import { GoogleIcon } from '../common/svgs';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail, RefreshCw } from 'lucide-react';
import OtpVerification from './otp-verification';
import { authClient, signIn } from '@/lib/auth-client';

export default function SignInFlow({
  onAuthSuccess,
}: {
  onAuthSuccess: () => void;
}) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [isSending, setIsSending] = useState(false);
  const [rateLimited, setRateLimited] = useState(false);
  const [, setRetryAfter] = useState<number | null>(null);
  const [retryCountdown, setRetryCountdown] = useState<number | null>(null);

  // Countdown effect for rate limiting
  useEffect(() => {
    if (retryCountdown && retryCountdown > 0) {
      const interval = setInterval(() => {
        setRetryCountdown((prev) => {
          if (prev && prev <= 1) {
            clearInterval(interval);
            setRateLimited(false);
            return null;
          }
          return prev ? prev - 1 : null;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [retryCountdown]);

  const handleSendCode = async () => {
    setIsSending(true);
    try {
      // First, check if the client is rate limited
      const rateLimitCheck = await fetch('/api/check-rate-limit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          action: 'send',
        }),
      });

      const rateLimitData = await rateLimitCheck.json();

      if (!rateLimitCheck.ok) {
        // Handle rate limit exceeded
        if (rateLimitCheck.status === 429) {
          setRateLimited(true);
          // Convert reset time to seconds from now
          const resetAfter = Math.ceil(
            (rateLimitData.reset - Date.now()) / 1000
          );
          setRetryAfter(resetAfter);
          setRetryCountdown(resetAfter);

          toast.warning(
            `Too many attempts. Please try again in ${resetAfter} seconds.`
          );
          return;
        }
      }

      // Send OTP to the user's email using better-auth
      const { error } = await authClient.emailOtp.sendVerificationOtp({
        email,
        type: 'sign-in',
      });

      if (error) {
        console.error('Error sending OTP:', error);
        toast.error(
          'There was an error sending the verification code. Please try again.'
        );
        return;
      }

      // Move to OTP verification step
      setStep('otp');
      toast.info('Check your email for the verification code.');
    } catch (error) {
      console.error('Error sending OTP:', error);
      toast.error('An unexpected error occurred. Please try again later.');
    } finally {
      setIsSending(false);
    }
  };

  const handleVerifyOtp = async (otp: string) => {
    try {
      // Check rate limit for verification attempts
      const rateLimitCheck = await fetch('/api/check-rate-limit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          action: 'verify',
        }),
      });

      const rateLimitData = await rateLimitCheck.json();

      if (!rateLimitCheck.ok) {
        // Handle rate limit exceeded
        if (rateLimitCheck.status === 429) {
          const resetAfter = Math.ceil(
            (rateLimitData.reset - Date.now()) / 1000
          );
          toast.warning(
            `Verification limit exceeded. Please try again in ${resetAfter} seconds.`
          );
          return;
        }
      }

      // Verify OTP and sign in the user using better-auth
      const { error } = await authClient.signIn.emailOtp({
        email,
        otp,
      });

      if (error) {
        console.error('Error verifying OTP:', error);
        toast.error('Invalid or expired code. Please try again.');
        return;
      }

      toast.success('You have successfully signed in.');

      // Redirect to dashboard  page after successful sign-in
      router.push('/dashboard');
      onAuthSuccess();
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast.error('An unexpected error occurred. Please try again later.');
    }
  };

  const handleResendOtp = async () => {
    try {
      // Check rate limit before resending
      const rateLimitCheck = await fetch('/api/check-rate-limit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          action: 'send',
        }),
      });

      const rateLimitData = await rateLimitCheck.json();

      if (!rateLimitCheck.ok) {
        // Handle rate limit exceeded
        if (rateLimitCheck.status === 429) {
          const resetAfter = Math.ceil(
            (rateLimitData.reset - Date.now()) / 1000
          );
          toast.warning(
            `Too many attempts. Please try again in ${resetAfter} seconds.`
          );
          return;
        }
      }

      // Resend OTP to the user's email using better-auth
      const { error } = await authClient.emailOtp.sendVerificationOtp({
        email,
        type: 'sign-in',
      });

      if (error) {
        console.error('Error resending OTP:', error);
        toast.error(
          'There was an error sending the verification code. Please try again.'
        );
        return;
      }

      toast.success('A new verification code has been sent to your email.');
    } catch (error) {
      console.error('Error resending OTP:', error);
      toast.error('An unexpected error occurred. Please try again later.');
    }
  };

  if (step === 'otp') {
    return (
      <OtpVerification
        email={email}
        onVerify={handleVerifyOtp}
        onResend={handleResendOtp}
        onBack={() => setStep('email')}
      />
    );
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-lg p-6">
      <div className="mb-6 flex flex-col items-center">
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
          <Mail />
        </div>
        <h1 className="text-xl font-semibold">Sign In</h1>
        <p className="mt-2 text-sm text-gray-500">
          Don&apos;t have an account?{' '}
          <a href="#" className="text-gray-600 hover:underline">
            Sign up
          </a>
          .
        </p>
      </div>

      <Button
        variant="outline"
        className="mb-6 flex w-full items-center justify-center gap-2"
        onClick={async () => {
          await signIn.social({
            provider: 'google',
            callbackURL: '/dashboard',
          });
        }}
      >
        <GoogleIcon />
        Sign in with Google
      </Button>

      <div className="relative mb-1">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500">OR CONTINUE WITH</span>
        </div>
      </div>

      <div className="mb-1">
        <label
          htmlFor="email"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border-gray-300"
        />
      </div>

      <div className="mb-6 flex gap-2">
        <Button
          className="flex-1"
          onClick={handleSendCode}
          disabled={
            !email ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
            isSending ||
            rateLimited
          }
        >
          {isSending ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : rateLimited && retryCountdown ? (
            `Try again in ${retryCountdown}s`
          ) : (
            'Send me an OTP'
          )}
        </Button>
      </div>

      <div className="text-center text-xs text-gray-500">
        <p>
          By signing in your agree to Shared Memories
          <br />
          <a href="#" className="text-gray-600 hover:underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-gray-600 hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}
