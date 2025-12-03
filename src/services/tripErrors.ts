// ─────────────────────────────────────────────────────────────────────────
// Maps Firestore and app-specific errors to friendly, human-readable messages.
// Helps users understand what went wrong when trip operations fail.
// ─────────────────────────────────────────────────────────────────────────

export function getTripErrorMessage(error: unknown): string {
  // Handle unknown error types gracefully
  if (!error) {
    return "Something went wrong with your trip. Please try again.";
  }

  // Extract error message if it's an Error object
  const message = (error as Error).message || String(error);

  // Map common Firestore error codes to friendly messages
  if (message.includes("permission-denied")) {
    return "You don't have permission to perform this action. Please check your connection and try again.";
  }

  if (message.includes("not-found")) {
    return "Trip not found. It may have been deleted. Please refresh and try again.";
  }

  if (message.includes("already-exists")) {
    return "This trip already exists. Please try creating a new one.";
  }

  if (message.includes("failed-precondition")) {
    return "We're having trouble syncing your changes. Please check your internet connection.";
  }

  if (message.includes("invalid-argument")) {
    return "The trip information you provided isn't valid. Please check and try again.";
  }

  if (message.includes("deadline-exceeded")) {
    return "The request took too long. Please check your connection and try again.";
  }

  if (message.includes("resource-exhausted")) {
    return "You've hit a limit. Please wait a moment before creating more trips.";
  }

  if (message.includes("unauthenticated")) {
    return "You've been logged out. Please log back in to continue.";
  }

  if (message.includes("unavailable")) {
    return "We're temporarily unavailable. Please check your internet connection and try again.";
  }

  if (message.includes("network")) {
    return "Network error. Please check your internet connection.";
  }

  // Fallback for unrecognized errors
  return "Something went wrong with your trip. Please try again.";
}
