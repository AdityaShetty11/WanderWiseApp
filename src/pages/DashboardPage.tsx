import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppNav, Button, Alert } from "../components/ui";
import { daysBetween, isUpcoming } from "../utils/helpers";
import { TripCardComponent } from "../components/TripCardComponent";
import { CreateTripModalComponent } from "../components/CreateTripModalComponent";
import { useAuth } from "../context/AuthContext";
import { useTrips } from "../hooks/useTrips";

type Filter = "all" | "upcoming" | "past";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, signOutUser } = useAuth();
  // Fetch the current user's trips from Firestore with real-time updates
  const { trips, loading, error } = useTrips(user?.uid);
  const [filter, setFilter] = useState<Filter>("all");
  const [showModal, setShowModal] = useState(false);
  const [createdId, setCreatedId] = useState<string | null>(null);

  // Debug: log modal state changes to verify parent handler is called
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.debug("Dashboard: showModal =>", showModal);
  }, [showModal]);

  // Wrapper around setShowModal so we can log invocations from child
  function closeModal() {
    // eslint-disable-next-line no-console
    console.debug("Dashboard: closeModal called");
    setShowModal(false);
  }

  function handleCreated(id: string) {
    // show temporary confirmation with the created Firestore document id
    setCreatedId(id);
    setTimeout(() => setCreatedId(null), 6000);
  }

  const filtered = trips.filter(t =>
    filter === "all"      ? true :
    filter === "upcoming" ? isUpcoming(t.endDate) :
    !isUpcoming(t.endDate)
  );
  const upcoming = filtered.filter(t => isUpcoming(t.endDate));
  const past     = filtered.filter(t => !isUpcoming(t.endDate));

  const totalDays = trips.reduce((a, t) => a + daysBetween(t.startDate, t.endDate), 0);
  const displayName = user?.email?.split("@")[0] ?? "traveler";

  async function handleLogout() {
    await signOutUser();
    navigate("/login", { replace: true });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AppNav email={user?.email ?? undefined} onLogout={handleLogout} />

      <div className="max-w-2xl mx-auto px-4 py-7">
          {/* error message if trip fetching failed */}
          {error && (
            <Alert type="error" message={error} />
          )}

          {/* temporary success confirmation after creating a trip */}
          {createdId && (
            <div className="mb-4">
              <Alert type="success" message={
                <span>
                  Trip created — document id: <strong>{createdId}</strong>
                </span>
              } />
            </div>
          )}

        {/* header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">My trips</h1>
            <p className="text-sm text-gray-500 mt-0.5">Good to have you back, {displayName}</p>
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

        {/* loading state while fetching trips from Firestore */}
        {loading && (
          <div className="bg-white border border-gray-200 rounded-2xl py-8 text-center">
            <div className="inline-block animate-spin text-blue-500 mb-3">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3"/>
                <path d="M12 2a10 10 0 0 1 0 20" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
            </div>
            <div className="text-sm text-gray-500">Loading your trips...</div>
          </div>
        )}

        {/* empty state */}
        {!loading && trips.length === 0 && (
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
      {showModal && <CreateTripModalComponent userId={user?.uid ?? ""} onClose={closeModal} onCreated={handleCreated} />}
    </div>
  );
}
