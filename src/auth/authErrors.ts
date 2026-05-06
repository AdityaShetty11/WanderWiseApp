export function getAuthErrorMessage(error: unknown): string {
  if (!(error && typeof error === "object")) {
    return "Something went wrong. Please try again.";
  }

  const code = "code" in error ? String((error as { code?: unknown }).code ?? "") : "";
  const message = "message" in error ? String((error as { message?: unknown }).message ?? "") : "";

  if (code === "auth/email-already-in-use") return "That email is already in use. Try logging in instead.";
  if (code === "auth/invalid-email") return "That email address does not look valid.";
  if (code === "auth/weak-password") return "Pick a stronger password with at least 6 characters.";
  if (code === "auth/wrong-password") return "That password does not match our records.";
  if (code === "auth/user-not-found") return "We could not find an account with that email.";
  if (code === "auth/invalid-credential") return "Those credentials did not work. Please try again.";
  if (code === "auth/too-many-requests") return "Too many attempts. Please wait a moment and try again.";
  if (code === "auth/network-request-failed") return "Network trouble. Check your connection and try again.";

  return message || "Something went wrong. Please try again.";
}