// Centralized Google Apps Script endpoints for different forms
// Populate these via environment variables (e.g., Vite: VITE_* in .env)

export const GOOGLE_SHEETS = {
  contact: (import.meta as any).env.VITE_GSCRIPT_CONTACT_URL as string,
  fresher: (import.meta as any).env.VITE_GSCRIPT_FRESHER_URL as string,
  experienced: (import.meta as any).env.VITE_GSCRIPT_EXPERIENCED_URL as string,
};

export function getSheetUrlOrThrow(key: keyof typeof GOOGLE_SHEETS): string {
  const url = GOOGLE_SHEETS[key];
  if (!url) {
    throw new Error(`Missing Google Script URL for: ${key}. Set corresponding env var.`);
  }
  return url;
}


