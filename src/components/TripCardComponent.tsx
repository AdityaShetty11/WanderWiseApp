import { Pill } from "./ui";
import { formatDateShort, daysBetween, isUpcoming } from "../utils/helpers";
import { Trip } from "../types";

export function TripCardComponent({ trip, onClick }: { trip: Trip; onClick: () => void }) {
  const days = daysBetween(trip.startDate, trip.endDate);
  const upcoming = isUpcoming(trip.endDate);
  return (
    <div
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-xl flex overflow-hidden cursor-pointer hover:border-gray-300 hover:shadow-sm transition-all"
    >
      <div className="w-1 flex-shrink-0" style={{ background: trip.coverColor }} />
      <div className="flex-1 p-4 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div className="text-sm font-semibold text-gray-900 truncate">{trip.title}</div>
          <span className={`flex-shrink-0 text-[10px] font-medium px-2 py-0.5 rounded-full ${upcoming ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>
            {upcoming ? "Upcoming" : "Past"}
          </span>
        </div>
        <div className="text-xs text-gray-500 flex items-center gap-1 mb-2.5">
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.2" /><path d="M6 1C3.8 1 2 2.8 2 5c0 3 4 7 4 7s4-4 4-7c0-2.2-1.8-4-4-4z" stroke="currentColor" strokeWidth="1.2" fill="none" /></svg>
          {trip.destination}
        </div>
        {trip.description && (
          <p className="text-xs text-gray-400 truncate mb-2.5">{trip.description}</p>
        )}
        <div className="flex items-center gap-2">
          <Pill label={`${formatDateShort(trip.startDate)} → ${formatDateShort(trip.endDate)}`} />
          <Pill label={`${days} days`} />
        </div>
      </div>
      <div className="flex items-center pr-4 text-gray-300">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </div>
    </div>
  );
}
