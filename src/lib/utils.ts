import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Google Sheets integration utility
export async function sendToGoogleSheet(data: Record<string, string>, scriptURL: string) {
  try {
    const formData = new FormData();
    
    // Append all form data to FormData object
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const response = await fetch(scriptURL, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      return { success: true, message: 'Data sent successfully' };
    } else {
      return { success: false, message: 'Failed to send data' };
    }
  } catch (error) {
    console.error('Error sending to Google Sheets:', error);
    return { success: false, message: 'Network error occurred' };
  }
}