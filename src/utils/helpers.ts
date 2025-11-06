import { ActivityCategory, TripDay } from "../types";

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function buildDaysFromRange(startDate: string, endDate: string): TripDay[] {
  const days: TripDay[] = [];
  const current = new Date(startDate);
  const end = new Date(endDate);
  let order = 0;
  while (current <= end) {
    days.push({
      id: generateId(),
      date: current.toISOString().split("T")[0],
      order,
      activities: [],
    });
    current.setDate(current.getDate() + 1);
    order++;
  }
  return days;
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export function formatDateShort(dateStr: string): string {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function daysBetween(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
}

export function isUpcoming(endDate: string): boolean {
  return new Date(endDate + "T00:00:00") >= new Date();
}

export const CATEGORY_CONFIG: Record<ActivityCategory, { label: string; emoji: string; bg: string; text: string }> = {
  sightseeing:   { label: "Sightseeing",   emoji: "🏛️", bg: "bg-blue-50",   text: "text-blue-700" },
  food:          { label: "Food",          emoji: "🍽️", bg: "bg-green-50",  text: "text-green-700" },
  transport:     { label: "Transport",     emoji: "🚆", bg: "bg-amber-50",  text: "text-amber-700" },
  accommodation: { label: "Stay",          emoji: "🏨", bg: "bg-purple-50", text: "text-purple-700" },
  other:         { label: "Other",         emoji: "📌", bg: "bg-gray-100",  text: "text-gray-600" },
};

export const COVER_COLORS = [
  { label: "Ocean",    value: "#378ADD" },
  { label: "Forest",   value: "#1D9E75" },
  { label: "Sunset",   value: "#D85A30" },
  { label: "Rose",     value: "#D4537E" },
  { label: "Lavender", value: "#7F77DD" },
];
