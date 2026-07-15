import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
 
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import { useOtp } from "@/hooks/useOtp";
 
 
type OtpDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  phone: string;
  onVerify: (otp: string) => void | Promise<void>;
  onResend: () => void | Promise<void>;
  onClose: () => void;
};
 
function formatMaskedPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length >= 2) {
    const tail = digits.slice(-2);
    return `+91 XXXXXXXX${tail}`;
  }
  return phone;
}
 
export function OtpDialog({ open, onOpenChange, phone, onVerify, onResend, onClose }: OtpDialogProps) {
  const [otp, setOtp] = useState("");
  const [invalidOtp, setInvalidOtp] = useState<string | null>(null);
 
  // Business logic wiring kept intact (still uses existing hook + API for verification)
  const { state, sendOtp, verifyOtp } = useOtp({ phone, initialCountdownSeconds: 60 });
 
  useEffect(() => {
    if (!open) return;
    setOtp("");
    setInvalidOtp(null);
  }, [open]);
 
  // UI-only: send OTP when opening (existing behavior remains)
  useEffect(() => {
    if (!open) return;
    void sendOtp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
 
  const remaining = state.countdown;
  const mm = Math.floor(remaining / 60);
  const ss = remaining % 60;
 
  const countdownLabel = useMemo(() => {
    const s = ss.toString().padStart(2, "0");
    const m = mm.toString();
    return `${m}:${s}`;
  }, [mm, ss]);
 
  const canVerify = otp.trim().length === 6 && !state.isVerifying;
 
  const handleVerify = async () => {
    setInvalidOtp(null);
 
    if (otp.trim().length !== 6) {
      setInvalidOtp("Please enter the 6 digit OTP.");
      return;
    }
 
    // Keep current API integration for validation; parent callback only on success.
    const res = await verifyOtp(otp);
    if (!res.success) {
      setInvalidOtp(res.message || "Invalid OTP. Please try again.");
      return;
    }
 
    await onVerify(otp);
    onOpenChange(false);
  };
 
  const handleResend = async () => {
    if (!state.canResend || state.isSending) return;
    setInvalidOtp(null);
 
    await onResend();
    // Keep existing resend behavior for now
    void sendOtp();
  };
 
  const errorMessage = invalidOtp ?? state.error;
 
  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) onClose();
        onOpenChange(next);
      }}
    >
      <DialogContent
        className={cn(
          "w-[95vw] max-w-md border-white/10 bg-transparent p-0",
          "overflow-hidden"
        )}
      >
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.985 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="relative"
            >
              <div className="relative rounded-3xl bg-white/90 backdrop-blur-xl border border-white/30 p-8 shadow-2xl">
                <div className="flex items-start justify-between">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 shadow-md"
                  >
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                </div>
 
                <div className="mt-4 text-center">
                  <div className="text-3xl font-bold text-slate-900"> Verify OTP</div>
                  <div className="mt-2 text-sm text-gray-500">
                    Enter the 6-digit code sent to
                    <span className="font-semibold text-slate-800"> {formatMaskedPhone(phone)}</span>
                  </div>
                </div>
 
                <div className="mt-6 flex flex-col items-center gap-4">
                  <InputOTP
                    value={otp}
                    onChange={(val) => {
                      setOtp(val);
                      setInvalidOtp(null);
                    }}
                    maxLength={6}
                    containerClassName="justify-center"
                    inputMode="numeric"
                    aria-label="OTP"
                  >
                    <InputOTPGroup>
                      {[0, 1].map((i) => (
                        <InputOTPSlot key={i} index={i} />
                      ))}
                    </InputOTPGroup>
                    <InputOTPGroup>
                      {[2, 3].map((i) => (
                        <InputOTPSlot key={i} index={i} />
                      ))}
                    </InputOTPGroup>
                    <InputOTPGroup>
                      {[4, 5].map((i) => (
                        <InputOTPSlot key={i} index={i} />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
 
                  {errorMessage ? (
                    <div className="w-full text-center text-sm text-red-400" role="alert">
                      {errorMessage}
                    </div>
                  ) : null}
 
                  <div className="w-full text-center text-xs text-muted-foreground">
                    {state.canResend ? (
                      <button
                        type="button"
                        className={cn(
                        "font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-4",
                          state.isSending && "pointer-events-none opacity-70"
                        )}
                        onClick={() => void handleResend()}
                        disabled={state.isSending}
                      >
                        Resend OTP
                      </button>
                    ) : (
                      <span>
                        Resend available in <span className="font-semibold text-foreground">{countdownLabel}</span>
                      </span>
                    )}
                  </div>
 
                  <Button
                    type="button"
                    className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg transition-all"
                    onClick={() => void handleVerify()}
                    disabled={!canVerify}
                  >
                    {state.isVerifying ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-white" />
                        Verify OTP
                      </span>
                    ) : (
                      "Verify OTP"
                    )}
                  </Button>
                </div>
 
                <div className="mt-5 flex items-center justify-center">
                  <Button
                    type="button"
                    variant="ghost"
                    className="rounded-xl text-muted-foreground hover:text-foreground"
                    onClick={() => {
                      onClose();
                      onOpenChange(false);
                    }}
                    disabled={state.isVerifying}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}