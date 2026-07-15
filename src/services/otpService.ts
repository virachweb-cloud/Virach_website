export type SendOtpResponse = { success: boolean; message?: string };
 
export async function sendOtp({
  phone,
}: {
  phone: string;
}): Promise<SendOtpResponse> {
  const baseUrl = "https://virach-website.onrender.com";
  const res = await fetch(`${baseUrl}/send-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phone }),
  });
 
 if (!res.ok) {
  return {
    success: false,
    message: "Unable to send OTP. Please try again later.",
  };
}
 
  return (await res.json()) as SendOtpResponse;
}
 
export type VerifyOtpResponse =
  | { success: true; message?: string }
  | { success: false; message: string };
 
export async function verifyOtp({
  phone,
  otp,
}: {
  phone: string;
  otp: string;
}): Promise<VerifyOtpResponse> {
  const baseUrl = "https://virach-website.onrender.com";
 
  const res = await fetch(`${baseUrl}/verify-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phone, otp }),
  });
 
  if (!res.ok) {
    return {
    success:false,
    message:"OTP verification failed. Please try again."
}
}
 
 
  const data = (await res.json()) as VerifyOtpResponse;
  // Ensure invalid OTP shape is consistent
  if (data && typeof data.success === "boolean") return data;
 
  return {
    success: false,
    message: "Invalid OTP. Please try again.",
  };
}