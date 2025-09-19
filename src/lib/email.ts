import emailjs from "@emailjs/browser";

type EmailPayload = Record<string, string>;

// Initialize EmailJS
emailjs.init("Ed51CruoXIRPRh6DF");

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

export async function sendCareerApplicationEmail(payload: EmailPayload, applicationType: 'fresher' | 'experienced') {
  const serviceId = "service_8kqtneq"; // Your provided service ID
  const templateId = "template_eumn2ma"; // Your actual template ID
  const publicKey = "Ed51CruoXIRPRh6DF"; // Your provided public key

  console.log("EmailJS Debug Info:", {
    serviceId,
    templateId,
    applicationType,
    payloadKeys: Object.keys(payload),
    payloadSample: {
      position_applied: payload.position_applied,
      full_name: payload.full_name,
      email_address: payload.email_address
    }
  });

  try {
    const result = await emailjs.send(serviceId, templateId, payload, { publicKey });
    console.log("EmailJS Success:", result);
    return { success: true, message: result.text ?? "Career application email sent" };
  } catch (error) {
    console.error("EmailJS career application send error:", error);
    console.error("Error details:", {
      errorType: typeof error,
      errorMessage: error instanceof Error ? error.message : String(error),
      errorStack: error instanceof Error ? error.stack : undefined
    });
    return { 
      success: false, 
      message: `Failed to send career application email: ${error instanceof Error ? error.message : String(error)}` 
    };
  }
}


