import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { VerifyOtpResponse } from "@/services/otpService";
import { sendOtp as sendOtpApi, verifyOtp as verifyOtpApi } from "@/services/otpService";
 
export type UseOtpState = {
  isSending: boolean;
  isVerifying: boolean;
  error: string | null;
  countdown: number;
  canResend: boolean;
};
 
export function useOtp({ phone, initialCountdownSeconds = 60 }: { phone: string; initialCountdownSeconds?: number }) {
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(initialCountdownSeconds);
 
  const intervalRef = useRef<number | null>(null);
 
  const canResend = useMemo(() => countdown <= 0, [countdown]);
 
  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);
 
  const restartTimer = useCallback(() => {
    clearTimer();
    setCountdown(initialCountdownSeconds);
    intervalRef.current = window.setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearTimer();
          return 0;
        }
        return c - 1;
      });
    }, 1000);
  }, [clearTimer, initialCountdownSeconds]);
 
  useEffect(() => {
    restartTimer();
    return clearTimer;
  }, [restartTimer, clearTimer]);
 
  const sendOtp = useCallback(async () => {
    setError(null);
    setIsSending(true);
    try {
      const res = await sendOtpApi({ phone });
      if (!res.success) {
        setError(res.message || "Failed to send OTP.");
        return { success: false } as const;
      }
      restartTimer();
      return { success: true } as const;
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to send OTP.";
      setError(msg);
      return { success: false } as const;
    } finally {
      setIsSending(false);
    }
  }, [phone, restartTimer]);
 
  const verifyOtp = useCallback(
    async (otp: string): Promise<VerifyOtpResponse> => {
      setError(null);
      setIsVerifying(true);
      try {
        const res = await verifyOtpApi({ phone, otp });
        if (!res.success) {
          setError(res.message || "Invalid OTP. Please try again.");
        }
        return res;
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Invalid OTP. Please try again.";
        setError(msg);
        return { success: false, message: msg };
      } finally {
        setIsVerifying(false);
      }
    },
    [phone]
  );
 
  return {
    state: { isSending, isVerifying, error, countdown, canResend } satisfies UseOtpState,
    sendOtp,
    verifyOtp,
    restartTimer,
  };
}