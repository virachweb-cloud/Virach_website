import emailjs from "@emailjs/browser";

type EmailPayload = Record<string, string>;

function getEnv(name: string): string | undefined {
  // Vite exposes env vars prefixed with VITE_
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const v: any = (import.meta as any)?.env ?? {};
  return v[name];
}

// Initialize EmailJS with public key from env, fallback to known key (for dev)
const PUBLIC_KEY = getEnv("VITE_EMAILJS_PUBLIC_KEY") || "Ed51CruoXIRPRh6DF";
emailjs.init(PUBLIC_KEY);

export async function sendContactEmail(payload: EmailPayload) {
  const serviceId = getEnv("VITE_EMAILJS_SERVICE_ID") || "service_8kqtneq";
  const templateId = getEnv("VITE_EMAILJS_CONTACT_TEMPLATE_ID") || "template_x10de8h";
  const publicKey = PUBLIC_KEY;

  if (!templateId) {
    return {
      success: false,
      message: "EmailJS template missing: set VITE_EMAILJS_CONTACT_TEMPLATE_ID",
    };
  }

  try {
    const result = await emailjs.send(serviceId, templateId, payload, { publicKey });
    return { success: true, message: result.text ?? "Email sent" };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("EmailJS send error", message, error);
    return { success: false, message };
  }
}

export async function sendCareerApplicationEmail(
  payload: EmailPayload,
  applicationType: "fresher" | "experienced"
) {
  const serviceId = getEnv("VITE_EMAILJS_SERVICE_ID") || "service_8kqtneq";
  const templateId =
    applicationType === "fresher"
      ? getEnv("VITE_EMAILJS_FRESHER_TEMPLATE_ID") || "template_eumn2ma"
      : getEnv("VITE_EMAILJS_EXPERIENCED_TEMPLATE_ID") || "template_eumn2ma";
  const publicKey = PUBLIC_KEY;

  if (!templateId) {
    return {
      success: false,
      message: `EmailJS template missing for ${applicationType}`,
    };
  }

  try {
    const result = await emailjs.send(serviceId, templateId, payload, { publicKey });
    return { success: true, message: result.text ?? "Career application email sent" };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("EmailJS career application send error:", message, error);
    return {
      success: false,
      message,
    };
  }
}


