import emailjs from "@emailjs/browser";

type EmailPayload = Record<string, string>;

function getEnv(name: string): string | undefined {
  // Vite exposes env vars prefixed with VITE_
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const v: any = import.meta && (import.meta as any).env;
  return v ? v[name] : undefined;
}

export async function sendContactEmail(payload: EmailPayload) {
  const serviceId = getEnv("VITE_EMAILJS_SERVICE_ID");
  const templateId = getEnv("VITE_EMAILJS_TEMPLATE_ID");
  const publicKey = getEnv("VITE_EMAILJS_PUBLIC_KEY");

  if (!serviceId || !templateId || !publicKey) {
    return {
      success: false,
      message: "EmailJS env vars missing: VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY",
    };
  }

  try {
    const result = await emailjs.send(serviceId, templateId, payload, { publicKey });
    return { success: true, message: result.text ?? "Email sent" };
  } catch (error) {
    console.error("EmailJS send error", error);
    return { success: false, message: "Failed to send email" };
  }
}


