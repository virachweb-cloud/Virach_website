// Centralized Google Apps Script endpoints for different forms
// Populate these via environment variables (e.g., Vite: VITE_* in .env)

const FALLBACK_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwfrREUhUitaxfvt7CvGPmYb14frS59PWZnPT1OrsnhnrMZaG_oMWJFG8BgaDRlOwQbPg/exec";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const env: any = (import.meta as any)?.env ?? {};

export const GOOGLE_SHEETS = {
  contact: (env.VITE_GSCRIPT_CONTACT_URL as string) || FALLBACK_SCRIPT_URL,
  fresher: (env.VITE_GSCRIPT_FRESHER_URL as string) || FALLBACK_SCRIPT_URL,
  experienced: (env.VITE_GSCRIPT_EXPERIENCED_URL as string) || FALLBACK_SCRIPT_URL,
};

export function getSheetUrlOrThrow(key: keyof typeof GOOGLE_SHEETS): string {
  const url = GOOGLE_SHEETS[key];
  if (!url) {
    throw new Error(`Missing Google Script URL for: ${key}. Set corresponding env var.`);
  }
  return url;
}


