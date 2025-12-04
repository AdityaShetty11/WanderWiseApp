export type ActivityCategory =
  | "sightseeing"
  | "food"
  | "transport"
  | "accommodation"
  | "other";

export interface Activity {
  id: string;
  title: string;
  time?: string;
  category?: ActivityCategory;
  location?: string;
  notes?: string;
  createdAt: string;
}

export interface TripDay {
  id: string;
  date: string;
  order: number;
  activities: Activity[];
}

export interface Trip {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  description?: string;
  coverColor: string;
  userId: string;
  createdAt: string;
  updatedAt?: string;
  days: TripDay[];
}

export interface AuthUser {
  uid: string;
  email: string | null;
}

export interface AISuggestion {
  name: string;
  category: ActivityCategory;
  location: string;
  duration: string;
  bestTime: string;
  description: string;
  isHiddenGem?: boolean;
}
