// ─────────────────────────────────────────────────────────────────────────
// Custom React hook for managing user's trips with real-time Firestore sync.
// Handles subscription lifecycle, loading/error states, and automatic cleanup.
// ─────────────────────────────────────────────────────────────────────────

import { useEffect, useState } from "react";
import { Trip } from "../types";
import { subscribeToUserTrips, getTripsByUserId } from "../services/tripService";

interface UseTripsState {
  trips: Trip[];
  loading: boolean;
  error: string | null;
}

/**
 * Hook that provides real-time access to the current user's trips from Firestore.
 * Automatically subscribes to changes and cleans up when component unmounts.
 *
 * @param userId - The user's unique ID to fetch trips for
 * @returns Object with trips array, loading flag, and error message
 */
export function useTrips(userId: string | undefined): UseTripsState {
  const [state, setState] = useState<UseTripsState>({
    trips: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    // Don't subscribe if userId is not available (user not logged in)
    if (!userId) {
      setState({ trips: [], loading: false, error: null });
      return;
    }

    // Reset loading and error state when subscribing
    setState((prev) => ({ ...prev, loading: true, error: null }));

    let unsub: (() => void) | null = null;

    // First, do a one-time fetch so UI shows existing trips even if realtime Listen is blocked
    getTripsByUserId(userId)
      .then((initialTrips) => {
        setState({ trips: initialTrips, loading: false, error: null });
      })
      .catch((err) => {
        // Log raw error for debugging
        // eslint-disable-next-line no-console
        console.error("useTrips initial fetch error:", err);
        // If initial fetch fails, still try to subscribe; surface friendly error
        setState({ trips: [], loading: false, error: String(err) });
      })
      .finally(() => {
        // Then start the realtime listener; if it fails we'll keep the one-time results
        try {
          unsub = subscribeToUserTrips(
            userId,
            (trips) => {
              setState({ trips, loading: false, error: null });
            },
            (error) => {
              // Keep whatever trips we have but surface the error
              setState((prev) => ({ trips: prev.trips, loading: false, error }));
            }
          );
        } catch (e) {
          setState((prev) => ({ trips: prev.trips, loading: false, error: String(e) }));
        }
      });

    // Clean up the subscription when component unmounts or userId changes
    return () => {
      if (unsub) unsub();
    };
  }, [userId]);

  return state;
}
