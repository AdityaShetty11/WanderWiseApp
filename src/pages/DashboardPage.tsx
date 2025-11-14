import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppNav, Button } from "../components/ui";
import { daysBetween, isUpcoming } from "../utils/helpers";
import { Trip } from "../types";
import { TripCardComponent } from "../components/TripCardComponent";
import { CreateTripModalComponent } from "../components/CreateTripModalComponent";

// ── Mock trips for UI preview ────────────────────────────
const MOCK_TRIPS: Trip[] = [
  {
    id: "1", title: "Summer in Japan", destination: "Tokyo · Kyoto · Osaka",
    startDate: "2025-06-01", endDate: "2025-06-14", coverColor: "#378ADD",
    description: "Cherry blossoms, temples and great food.",
    userId: "u1", createdAt: new Date().toISOString(), days: [],
  },
  {
    id: "2", title: "Lisbon long weekend", destination: "Lisbon, Portugal",
    startDate: "2025-07-18", endDate: "2025-07-21", coverColor: "#1D9E75",
    description: "Pastéis de nata and sunset over the Tagus.",
    userId: "u1", createdAt: new Date().toISOString(), days: [],
  },
  {
    id: "3", title: "Barcelona city break", destination: "Barcelona, Spain",
    startDate: "2024-03-03", endDate: "2024-03-07", coverColor: "#D85A30",
    userId: "u1", createdAt: new Date().toISOString(), days: [],
  },
];

type Filter = "all" | "upcoming" | "past";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [trips]        = useState<Trip[]>(MOCK_TRIPS);
  const [filter, setFilter] = useState<Filter>("all");
  const [showModal, setShowModal] = useState(false);

  const filtered = trips.filter(t =>
    filter === "all"      ? true :
    filter === "upcoming" ? isUpcoming(t.endDate) :
    !isUpcoming(t.endDate)
  );
  const upcoming = filtered.filter(t => isUpcoming(t.endDate));
  const past     = filtered.filter(t => !isUpcoming(t.endDate));

  const totalDays = trips.reduce((a, t) => a + daysBetween(t.startDate, t.endDate), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <AppNav email="jan@example.com" onLogout={() => {navigate("/")}} />

      <div className="max-w-2xl mx-auto px-4 py-7">
        {/* header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">My trips</h1>
            <p className="text-sm text-gray-500 mt-0.5">Good to have you back, Jan</p>
          </div>
          <Button onClick={() => setShowModal(true)} size="md">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            New trip
          </Button>
        </div>

        {/* stats */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { val: trips.length, label: "Total trips" },
            { val: trips.filter(t => isUpcoming(t.endDate)).length, label: "Upcoming" },
            { val: totalDays, label: "Days planned" },
          ].map(s => (
            <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-3.5">
              <div className="text-xl font-semibold text-gray-900">{s.val}</div>
              <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* filters */}
        <div className="flex gap-2 mb-5">
          {(["all", "upcoming", "past"] as Filter[]).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs px-3.5 py-1.5 rounded-full border transition-colors capitalize ${
                filter === f
                  ? "bg-white text-gray-900 font-medium border-gray-300"
                  : "bg-transparent text-gray-500 border-gray-200 hover:bg-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* empty state */}
        {trips.length === 0 && (
          <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl py-14 text-center">
            <div className="text-4xl mb-3">🗺️</div>
            <div className="text-sm font-medium text-gray-700 mb-1">No trips yet</div>
            <div className="text-sm text-gray-400 mb-5">Create your first trip and start building a day-by-day itinerary.</div>
            <Button onClick={() => setShowModal(true)}>Create your first trip</Button>
          </div>
        )}

        {/* upcoming trips */}
        {upcoming.length > 0 && (
          <div className="mb-5">
            <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-2.5">Upcoming</p>
            <div className="space-y-2.5">
              {upcoming.map(t => <TripCardComponent key={t.id} trip={t} onClick={() => navigate(`/trip/${t.id}`)} />)}
            </div>
          </div>
        )}

        {/* past trips */}
        {past.length > 0 && (
          <div>
            <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-2.5">Past</p>
            <div className="space-y-2.5 opacity-60">
              {past.map(t => <TripCardComponent key={t.id} trip={t} onClick={() => navigate(`/trip/${t.id}`)} />)}
            </div>
          </div>
        )}
      </div>

      {/* Create trip modal */}
      {showModal && <CreateTripModalComponent onClose={() => setShowModal(false)} onCreated={id => navigate(`/trip/${id}`)} />}
    </div>
  );
}
