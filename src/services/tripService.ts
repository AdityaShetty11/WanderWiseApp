// ─────────────────────────────────────────────────────────────────────────
// Firestore service for managing user trips with real-time synchronization.
// Handles all CRUD operations (Create, Read, Update, Delete) with automatic
// timestamps and user isolation to ensure data privacy.
// ─────────────────────────────────────────────────────────────────────────

import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  Unsubscribe,
  Timestamp,
  orderBy,
} from "firebase/firestore";
import { Trip } from "../types";
import { getTripErrorMessage } from "./tripErrors";

// Initialize Firestore
const db = getFirestore();
const TRIPS_COLLECTION = "trips";

/**
 * Fetches all trips for a specific user from Firestore with real-time updates.
 * Sets up a listener that automatically pushes new data whenever trips change.
 *
 * @param userId - The unique user ID to fetch trips for (ensures user isolation)
 * @param onUpdate - Callback function that receives the updated trips array whenever data changes
 * @param onError - Callback function that receives error messages if something goes wrong
 * @returns An unsubscribe function to stop listening for updates
 */
export function subscribeToUserTrips(
  userId: string,
  onUpdate: (trips: Trip[]) => void,
  onError: (error: string) => void
): Unsubscribe {
  try {
    // Create a query that filters trips by userId and sorts by creation date (newest first)
    const q = query(
      collection(db, TRIPS_COLLECTION),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );

    // Set up real-time listener that fires whenever the data changes
    return onSnapshot(
      q,
      (snapshot) => {
        // Transform Firestore documents into Trip objects
        const trips = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as Trip[];

        onUpdate(trips);
      },
      (error) => {
        // Log raw SDK error for debugging
        // eslint-disable-next-line no-console
        console.error("subscribeToUserTrips raw error:", error);
        // Handle errors and convert to friendly messages
        const friendlyError = getTripErrorMessage(error);
        const original = (error as Error)?.message ?? String(error);
        onError(`${friendlyError} — debug: ${original}`);
      }
    );
  } catch (error) {
    const friendlyError = getTripErrorMessage(error);
    onError(friendlyError);
    // Return a no-op unsubscribe function if setup fails
    return () => {};
  }
}

/**
 * Creates a new trip for a user in Firestore.
 * Automatically sets createdAt and updatedAt timestamps, and associates the trip with the user.
 *
 * @param userId - The user's unique ID (ensures the trip is linked to this user)
 * @param trip - The trip object to create (id will be generated automatically)
 * @returns The newly created trip with Firestore document ID, or throws an error
 */
export async function createTrip(userId: string, trip: Trip): Promise<Trip> {
  try {
    // Create a new document reference with an auto-generated ID
    const newDocRef = doc(collection(db, TRIPS_COLLECTION));

    // Get current timestamp for consistency
    const now = new Date().toISOString();

    // Prepare the trip data with timestamps and user association
    const tripData = {
      title: trip.title,
      destination: trip.destination,
      startDate: trip.startDate,
      endDate: trip.endDate,
      description: trip.description || "",
      coverColor: trip.coverColor,
      days: trip.days,
      userId, // Ensures this trip belongs to this user
      createdAt: Timestamp.now(), // Records when the trip was created
      updatedAt: Timestamp.now(), // Records when the trip was last modified
    };
console.log('tripData',tripData);
    // Write the trip to Firestore
    await setDoc(newDocRef, tripData);
console.log('return');
    // Return the created trip with the Firestore document ID and ISO string timestamps
    return {
      ...trip,
      id: newDocRef.id,
      userId,
      createdAt: now,
      updatedAt: now,
    };
  } catch (error) {
    // Log the raw SDK error locally for debugging
    // Then throw an error that contains both the friendly message and the original SDK message.
    // This helps you (or CI/browser logs) see the exact Firestore SDK failure.
    // eslint-disable-next-line no-console
    console.error("createTrip: raw error:", error);
    const friendly = getTripErrorMessage(error);
    const original = (error as Error)?.message ?? String(error);
    throw new Error(`${friendly} — debug: ${original}`);
  }
}

/**
 * Updates an existing trip in Firestore.
 * Automatically updates the updatedAt timestamp.
 * Only the trip creator can update their own trips (enforced by userId).
 *
 * @param tripId - The Firestore document ID of the trip to update
 * @param userId - The user's ID (used to verify ownership before updating)
 * @param updates - Partial trip object with only the fields to update
 * @returns The updated trip, or throws an error if not found or not owned by user
 */
export async function updateTrip(
  tripId: string,
  userId: string,
  updates: Partial<Trip>
): Promise<Trip> {
  try {
    // Reference the specific trip document
    const tripRef = doc(db, TRIPS_COLLECTION, tripId);

    // Verify the trip belongs to this user (security check before updating)
    const tripDoc = await getDocs(
      query(
        collection(db, TRIPS_COLLECTION),
        where("userId", "==", userId)
      )
    );

    const tripExists = tripDoc.docs.some((doc) => doc.id === tripId);
    if (!tripExists) {
      throw new Error("Trip not found or you don't have permission to update it.");
    }

    // Prepare updates with the current timestamp
    const updateData = {
      ...updates,
      updatedAt: Timestamp.now(),
    };

    // Write the updates to Firestore
    await updateDoc(tripRef, updateData);

    // Fetch and return the updated trip
    const updatedTrip = await getDocs(
      query(collection(db, TRIPS_COLLECTION), where("userId", "==", userId))
    );

    const updated = updatedTrip.docs.find((doc) => doc.id === tripId);
    if (!updated) {
      throw new Error("Failed to retrieve updated trip.");
    }

    return {
      ...updated.data(),
      id: updated.id,
    } as Trip;
  } catch (error) {
    throw new Error(getTripErrorMessage(error));
  }
}

/**
 * Deletes a trip from Firestore.
 * Only the trip creator can delete their own trips (verified by userId).
 *
 * @param tripId - The Firestore document ID of the trip to delete
 * @param userId - The user's ID (used to verify ownership before deleting)
 * @returns Success message, or throws an error if not found or not owned by user
 */
export async function deleteTrip(tripId: string, userId: string): Promise<void> {
  try {
    // Reference the specific trip document
    const tripRef = doc(db, TRIPS_COLLECTION, tripId);

    // Verify the trip belongs to this user before deleting
    const tripDoc = await getDocs(
      query(
        collection(db, TRIPS_COLLECTION),
        where("userId", "==", userId)
      )
    );

    const tripExists = tripDoc.docs.some((doc) => doc.id === tripId);
    if (!tripExists) {
      throw new Error("Trip not found or you don't have permission to delete it.");
    }

    // Delete the trip from Firestore
    await deleteDoc(tripRef);
  } catch (error) {
    throw new Error(getTripErrorMessage(error));
  }
}

/**
 * Fetches all trips for a user from Firestore as a one-time read (no listening).
 * Useful when you just need the data once without real-time updates.
 *
 * @param userId - The user's unique ID (ensures user isolation)
 * @returns An array of trips belonging to this user, or throws an error
 */
export async function getTripsByUserId(userId: string): Promise<Trip[]> {
  try {
    // Create a query that fetches only trips owned by this user
    const q = query(
      collection(db, TRIPS_COLLECTION),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );

    // Fetch matching trips from Firestore
    const snapshot = await getDocs(q);

    // Transform documents into Trip objects
    return snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as Trip[];
  } catch (error) {
    throw new Error(getTripErrorMessage(error));
  }
}

/**
 * Fetches a single trip for a user by document ID.
 * Returns only trips owned by the current user so trip details stay isolated.
 *
 * @param tripId - The Firestore document ID of the trip to fetch
 * @param userId - The current user's ID used to verify ownership
 * @returns The matching trip, or throws an error if it is missing or inaccessible
 */
export async function getTripById(tripId: string, userId: string): Promise<Trip> {
  try {
    const tripRef = doc(db, TRIPS_COLLECTION, tripId);
    const snapshot = await getDoc(tripRef);

    if (!snapshot.exists()) {
      throw new Error("Trip not found.");
    }

    const data = snapshot.data();
    if (data.userId !== userId) {
      throw new Error("Trip not found or you do not have permission to view it.");
    }

    return {
      ...data,
      id: snapshot.id,
    } as Trip;
  } catch (error) {
    throw new Error(getTripErrorMessage(error));
  }
}
