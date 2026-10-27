import { toast } from "sonner";

/** Copies text and reports the result with a toast. Client-side only. */
export async function copyToClipboard(text: string, messages: { success: string; failed: string }) {
  try {
    await navigator.clipboard.writeText(text);
    toast(messages.success);
  } catch {
    toast(messages.failed);
  }
}
