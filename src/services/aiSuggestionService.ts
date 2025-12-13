import { AISuggestion } from "../types";
import { getMockAISuggestions } from "../data/aiSuggestionMocks";

/**
 * Returns hardcoded activity suggestions for a specific destination.
 *
 * @param destination - The city/location for the trip
 * @param startDate - Trip start date
 * @param endDate - Trip end date
 * @returns Array of AISuggestion objects tailored to the destination
 */
export async function fetchAISuggestions(
  destination: string,
  _startDate: string,
  _endDate: string
): Promise<AISuggestion[]> {
  return getMockAISuggestions(destination);
}

export async function fetchAISuggestionsDirectly(
  destination: string,
  _startDate: string,
  _endDate: string
): Promise<AISuggestion[]> {
  return getMockAISuggestions(destination);
}
