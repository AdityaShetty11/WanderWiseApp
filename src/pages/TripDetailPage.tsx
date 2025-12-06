import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppNav, Button, Input } from "../components/ui";
import { CATEGORY_CONFIG, formatDate, formatDateShort, daysBetween } from "../utils/helpers";
import { Activity, ActivityCategory, AISuggestion, Trip, TripDay } from "../types";
import { generateId } from "../utils/helpers";
import { useAuth } from "../context/AuthContext";
import { getTripById, updateTrip } from "../services/tripService";

const MOCK_SUGGESTIONS: AISuggestion[] = [
  { name: "Tokyo Tower", category: "sightseeing", location: "Minato, Tokyo", duration: "1 hr", bestTime: "17:00", description: "Iconic views over the city. Less crowded than Skytree, especially beautiful at night.", isHiddenGem: false },
  { name: "Yanaka Ginza", category: "sightseeing", location: "Yanaka, Tokyo", duration: "1.5 hrs", bestTime: "14:00", description: "Old Tokyo neighbourhood that survived WWII. Quiet, local, and tourist-free.", isHiddenGem: true },
  { name: "Ichiran Ramen", category: "food", location: "Multiple locations", duration: "45 min", bestTime: "12:30", description: "Solo dining booths for full ramen concentration. Visit off-peak hours.", isHiddenGem: false },
  { name: "Tsukiji Market breakfast", category: "food", location: "Tsukiji, Tokyo", duration: "1 hr", bestTime: "08:00", description: "Fresh sushi and street food breakfast. Outer market stalls remain vibrant.", isHiddenGem: false },
  { name: "Mount Takao hike", category: "sightseeing", location: "Hachioji, Tokyo", duration: "4 hrs", bestTime: "09:00", description: "Easy day hike with panoramic views of Mt Fuji on clear days.", isHiddenGem: true },
  { name: "Shinkansen to Kyoto", category: "transport", location: "Tokyo Station", duration: "2.5 hrs", bestTime: "09:30", description: "Take the Nozomi — fastest option. Book JR Pass in advance.", isHiddenGem: false },
];

type AIFilter = "All" | "Sightseeing" | "Food" | "Transport" | "Hidden gems";

export default function TripDetailPage() {
  const navigate = useNavigate();
  const { tripId } = useParams<{ tripId: string }>();
  const { user } = useAuth();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addDayId, setAddDayId] = useState<string | null>(null);
  const [deletingActId, setDeletingActId] = useState<string | null>(null);
  const [showAI, setShowAI] = useState(false);
  const [aiFilter, setAIFilter] = useState<AIFilter>("All");
  const [aiLoading, setAILoading] = useState(false);
  const [addedSugs, setAddedSugs] = useState<Set<string>>(new Set());
  const [savingTrip, setSavingTrip] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadTrip() {
      if (!tripId || !user?.uid) {
        if (active) {
          setError("Trip not found.");
          setLoading(false);
        }
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const tripData = await getTripById(tripId, user.uid);
        if (!active) return;
        setTrip(tripData);
      } catch (err) {
        if (!active) return;
        const message = err instanceof Error ? err.message : String(err);
        setError(message);
        setTrip(null);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadTrip();

    return () => {
      active = false;
    };
  }, [tripId, user?.uid]);

  const totalActs = trip?.days.reduce((a, d) => a + d.activities.length, 0) ?? 0;
  const daysWithActs = trip?.days.filter((d) => d.activities.length > 0).length ?? 0;
  const progressPct = trip?.days.length ? Math.round((daysWithActs / trip.days.length) * 100) : 0;

  async function persistDays(nextDays: TripDay[]) {
    if (!trip || !tripId || !user?.uid) return;

    setSavingTrip(true);
    setSaveError(null);

    try {
      const updatedTrip = await updateTrip(tripId, user.uid, {
        days: nextDays,
        updatedAt: new Date().toISOString(),
      });
      setTrip(updatedTrip);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setSaveError(message);
    } finally {
      setSavingTrip(false);
    }
  }

  function deleteActivity(dayId: string, actId: string) {
    if (!trip) return;

    const nextDays = trip.days.map((day) =>
      day.id !== dayId ? day : { ...day, activities: day.activities.filter((activity) => activity.id !== actId) }
    );

    void persistDays(nextDays);
    setDeletingActId(null);
  }

  function addActivityFromSuggestion(sug: AISuggestion, dayId: string) {
    const act: Activity = {
      id: generateId(),
      title: sug.name,
      time: sug.bestTime,
      category: sug.category,
      location: sug.location,
      createdAt: new Date().toISOString(),
    };

    if (!trip) return;

    const nextDays = trip.days.map((day) =>
      day.id !== dayId ? day : { ...day, activities: [...day.activities, act] }
    );

    void persistDays(nextDays);
    setAddedSugs((prev) => new Set(prev).add(sug.name));
  }

  const filteredSugs = MOCK_SUGGESTIONS.filter((sug) =>
    aiFilter === "All"
      ? true
      : aiFilter === "Hidden gems"
        ? sug.isHiddenGem
        : sug.category === aiFilter.toLowerCase()
  );

  async function loadAI() {
    setShowAI(true);
    setAILoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1800));
    setAILoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AppNav email={user?.email ?? undefined} backLabel="My trips" backTo="/dashboard" />

      {loading && (
        <div className="max-w-2xl mx-auto px-4 py-10">
          <div className="bg-white border border-gray-200 rounded-2xl py-10 text-center">
            <div className="inline-block animate-spin text-blue-500 mb-3">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3" />
                <path d="M12 2a10 10 0 0 1 0 20" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </div>
            <div className="text-sm text-gray-500">Loading trip details...</div>
          </div>
        </div>
      )}

      {!loading && error && (
        <div className="max-w-2xl mx-auto px-4 py-10">
          <div className="bg-white border border-red-200 rounded-2xl p-6">
            <h1 className="text-lg font-semibold text-gray-900 mb-2">Unable to load trip</h1>
            <p className="text-sm text-gray-600 mb-4">{error}</p>
            <Button onClick={() => navigate("/dashboard")}>Back to trips</Button>
          </div>
        </div>
      )}

      {!loading && !error && trip && (
        <>
          {saveError && (
            <div className="max-w-2xl mx-auto px-4 pt-4">
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
                {saveError}
              </div>
            </div>
          )}

          <div className="bg-white border-b border-gray-100">
            <div className="h-1.5 w-full" style={{ background: trip.coverColor }} />
            <div className="max-w-2xl mx-auto px-4 py-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h1 className="text-xl font-semibold text-gray-900">{trip.title}</h1>
                  <div className="flex items-center gap-1 text-sm text-gray-500 mt-0.5 mb-3">
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.2" /><path d="M6 1C3.8 1 2 2.8 2 5c0 3 4 7 4 7s4-4 4-7c0-2.2-1.8-4-4-4z" stroke="currentColor" strokeWidth="1.2" fill="none" /></svg>
                    {trip.destination}
                  </div>
                  <div className="flex flex-wrap gap-2 items-center">
                    {[
                      `${formatDateShort(trip.startDate)} – ${formatDateShort(trip.endDate)}`,
                      `${daysBetween(trip.startDate, trip.endDate)} days`,
                      `${totalActs} activities`,
                    ].map((label) => (
                      <span key={label} className="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{label}</span>
                    ))}
                  </div>
                  {trip.description && (
                    <p className="text-xs text-gray-400 mt-2 italic">{trip.description}</p>
                  )}
                </div>
                <div className="flex flex-col gap-2 flex-shrink-0">
                  <button
                    onClick={loadAI}
                    className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors whitespace-nowrap"
                    style={{ background: "#E6F1FB", color: "#0C447C", borderColor: "#B5D4F4" }}
                  >
                    <svg width="12" height="12" viewBox="0 0 13 13" fill="none"><path d="M6.5 1l1.2 3.6L11 6.5l-3.3 1.9L6.5 12 5.3 8.4 2 6.5l3.3-1.9z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" /></svg>
                    AI suggestions
                  </button>
                  <button className="text-xs text-gray-400 border border-gray-200 rounded-lg px-2.5 py-1.5 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-colors">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 3.5h9M4.5 3.5V2.5h4v1M5.5 6v4M7.5 6v4M3 3.5l.7 7h5.6l.7-7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                </div>
              </div>

              <div className="mt-3">
                <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${progressPct}%`, background: trip.coverColor }} />
                </div>
                <p className="text-[10px] text-gray-400 text-right mt-1">{daysWithActs} of {trip.days.length} days have activities</p>
              </div>
            </div>
          </div>

          <div className="max-w-2xl mx-auto px-4 py-5 space-y-3">
            {trip.days.map((day, idx) => (
              <div key={day.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full" style={{ background: trip.coverColor }} />
                    <div>
                      <span className="text-sm font-medium text-gray-800">Day {idx + 1}</span>
                      <span className="text-xs text-gray-400 ml-2">{formatDate(day.date)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {day.activities.length > 0 && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                        {day.activities.length} {day.activities.length === 1 ? "activity" : "activities"}
                      </span>
                    )}
                    <button
                      onClick={() => setAddDayId(day.id)}
                      disabled={savingTrip}
                      className="flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-md transition-colors"
                      style={{ color: "#185FA5", background: "#E6F1FB" }}
                    >
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
                      Add
                    </button>
                  </div>
                </div>

                {day.activities.length === 0 ? (
                  <div className="px-4 py-4 text-xs text-gray-400 italic text-center">
                    No activities yet — click Add to plan this day.
                  </div>
                ) : (
                  <div>
                    {day.activities.map((act) => {
                      const cat = CATEGORY_CONFIG[act.category ?? "other"];
                      const isDeleting = deletingActId === act.id;

                      return (
                        <div
                          key={act.id}
                          className={`flex items-start gap-2.5 px-4 py-3 border-b border-gray-100 last:border-0 group transition-colors ${isDeleting ? "bg-red-50" : "hover:bg-gray-50"}`}
                        >
                          <span className="text-[10px] text-gray-400 font-mono w-9 flex-shrink-0 mt-0.5">{act.time || "—"}</span>
                          <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded flex-shrink-0 mt-0.5 ${cat.bg} ${cat.text}`}>{cat.label}</span>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-gray-800">{act.title}</div>
                            {act.location && (
                              <div className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                                <svg width="9" height="9" viewBox="0 0 10 10" fill="none"><circle cx="5" cy="4" r="2" stroke="currentColor" strokeWidth="1" /><path d="M5 1C3.3 1 2 2.3 2 4c0 2.5 3 5 3 5s3-2.5 3-5c0-1.7-1.3-3-3-3z" stroke="currentColor" strokeWidth="1" fill="none" /></svg>
                                {act.location}
                              </div>
                            )}
                            {act.notes && <div className="text-xs text-gray-400 italic mt-1">{act.notes}</div>}
                          </div>
                          {isDeleting ? (
                            <div className="flex items-center gap-1.5 flex-shrink-0">
                              <span className="text-xs text-red-600">Delete?</span>
                              <button onClick={() => deleteActivity(day.id, act.id)} className="text-xs bg-red-500 text-white px-2 py-0.5 rounded">Yes</button>
                              <button onClick={() => setDeletingActId(null)} className="text-xs border border-gray-200 px-2 py-0.5 rounded text-gray-500">No</button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeletingActId(act.id)}
                              className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-400 transition-all flex-shrink-0"
                            >
                              <svg width="14" height="14" viewBox="0 0 13 13" fill="none"><path d="M2 3.5h9M4.5 3.5V2.5h4v1M5.5 6v4M7.5 6v4M3 3.5l.7 7h5.6l.7-7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {!loading && !error && trip && addDayId && (
        <AddActivityModal
          day={trip.days.find((day) => day.id === addDayId)!}
          tripColor={trip.coverColor}
          onClose={() => setAddDayId(null)}
          onSave={(act) => {
            if (!trip) return;

            const nextDays = trip.days.map((day) =>
              day.id !== addDayId ? day : { ...day, activities: [...day.activities, act] }
            );

            void persistDays(nextDays);
            setAddDayId(null);
          }}
        />
      )}

      {!loading && !error && trip && showAI && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end justify-center">
          <div className="bg-white rounded-t-2xl w-full max-w-2xl max-h-[80vh] flex flex-col">
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-9 h-1 bg-gray-200 rounded-full" />
            </div>

            <div className="px-5 pb-3 border-b border-gray-100">
              <div className="flex items-start justify-between mb-1">
                <div>
                  <div className="flex items-center gap-2 text-base font-semibold text-gray-900">
                    AI activity suggestions
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-100">Powered by Claude</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">Showing ideas for <strong>{trip.destination.split(" · ")[0]}</strong></div>
                </div>
                <button onClick={() => setShowAI(false)} className="w-7 h-7 rounded-full flex items-center justify-center text-sm text-gray-400 hover:bg-gray-100 transition-colors">✕</button>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1 mt-2.5">
                {(["All", "Sightseeing", "Food", "Transport", "Hidden gems"] as AIFilter[]).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setAIFilter(filter)}
                    className={`text-xs px-3 py-1.5 rounded-full whitespace-nowrap border transition-colors flex-shrink-0 ${
                      aiFilter === filter ? "bg-gray-900 text-white border-gray-900" : "bg-transparent border-gray-200 text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {aiLoading ? (
                <div className="flex flex-col items-center justify-center py-12 gap-3">
                  <div className="w-10 h-10 border-2 border-gray-100 border-t-blue-500 rounded-full animate-spin" />
                  <div className="text-sm font-medium text-gray-700">Finding the best places…</div>
                  <div className="text-xs text-gray-400 text-center max-w-xs">Claude is analysing your destination and trip dates to find the most relevant activities.</div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span>{filteredSugs.length} suggestion{filteredSugs.length !== 1 ? "s" : ""}</span>
                    {addedSugs.size > 0 && <span className="text-green-600 font-medium">{addedSugs.size} added to trip</span>}
                  </div>
                  {filteredSugs.map((sug) => {
                    const cat = CATEGORY_CONFIG[sug.category];
                    const isAdded = addedSugs.has(sug.name);

                    return (
                      <div key={sug.name} className={`border rounded-xl p-3.5 flex items-start gap-3 transition-colors ${isAdded ? "border-green-200 bg-green-50" : "border-gray-200 bg-white"}`}>
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg flex-shrink-0 ${cat.bg}`}>{cat.emoji}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1.5">
                            <div className="text-sm font-semibold text-gray-900">{sug.name}</div>
                            <button
                              onClick={() => !isAdded && addActivityFromSuggestion(sug, trip.days[0].id)}
                              className={`text-xs font-medium px-2.5 py-1 rounded-md flex items-center gap-1 flex-shrink-0 transition-colors ${
                                isAdded ? "bg-green-100 text-green-700" : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                              }`}
                            >
                              {isAdded ? "✓ Added" : "+ Add"}
                            </button>
                          </div>
                          <div className="flex gap-1.5 mb-1.5 flex-wrap">
                            <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${cat.bg} ${cat.text}`}>{cat.label}</span>
                            {sug.isHiddenGem && <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-amber-50 text-amber-700">Hidden gem</span>}
                          </div>
                          <p className="text-xs text-gray-500 leading-relaxed mb-2">{sug.description}</p>
                          <div className="flex gap-3 text-[10px] text-gray-400">
                            <span className="flex items-center gap-1">⏱ {sug.bestTime}</span>
                            <span>{sug.duration}</span>
                            <span className="flex items-center gap-1">📍 {sug.location}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>

            <div className="px-5 py-3 border-t border-gray-100 bg-gray-50">
              <p className="text-[10px] text-gray-400 text-center">
                ℹ Suggestions are AI-generated. Always verify times and opening hours before visiting.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AddActivityModal({
  day,
  tripColor,
  onClose,
  onSave,
}: {
  day: TripDay;
  tripColor: string;
  onClose: () => void;
  onSave: (act: Activity) => void;
}) {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [category, setCategory] = useState<ActivityCategory>("sightseeing");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    if (!title) return;
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setSaved(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    onSave({ id: generateId(), title, time, category, location, notes, createdAt: new Date().toISOString() });
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden relative">
        {saved && (
          <div className="absolute inset-0 bg-white/95 flex flex-col items-center justify-center gap-3 z-10 rounded-2xl">
            <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M6 14l6 6 10-10" stroke="#1D9E75" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <div className="text-base font-semibold text-gray-900">Activity added!</div>
            <div className="text-sm text-gray-500">{title} added to {day.date}</div>
          </div>
        )}

        <div className="flex items-start justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <div className="text-base font-semibold text-gray-900">Add activity</div>
            <div className="text-xs text-gray-500 mt-0.5 flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: tripColor }} />
              {formatDate(day.date)}
            </div>
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-full flex items-center justify-center text-sm text-gray-400 hover:bg-gray-100">✕</button>
        </div>

        <div className="px-5 py-5 space-y-4">
          <Input id="act-title" label="Activity title" placeholder="e.g. Senso-ji Temple visit" value={title} onChange={setTitle} required />

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-2">Category <span className="text-gray-400 font-normal">(optional)</span></label>
            <div className="grid grid-cols-5 gap-1.5">
              {(Object.entries(CATEGORY_CONFIG) as [ActivityCategory, typeof CATEGORY_CONFIG[ActivityCategory]][]).map(([key, cfg]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setCategory(key)}
                  className={`flex flex-col items-center gap-1 py-2 rounded-lg border transition-all ${
                    category === key ? `${cfg.bg} border-current ${cfg.text}` : "bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100"
                  }`}
                  style={{ borderColor: category === key ? "currentColor" : undefined }}
                >
                  <span className="text-base">{cfg.emoji}</span>
                  <span className="text-[9px] font-medium leading-none">{cfg.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input id="time" label="Time" type="time" value={time} onChange={setTime} hint="24-hour format" />
            <Input id="loc" label="Location" placeholder="e.g. Asakusa" value={location} onChange={setLocation} />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">
              Notes <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <textarea
              placeholder="Tips, reminders, booking references…"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              maxLength={280}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
            <div className={`text-xs text-right mt-0.5 ${notes.length > 220 ? "text-amber-500" : "text-gray-400"}`}>{notes.length}/280</div>
          </div>
        </div>

        <div className="px-5 py-3.5 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
          <div className="text-xs">
            {title ? (
              <span className="text-green-600 flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5.5" stroke="currentColor" strokeWidth="1" /><path d="M3.5 6l2 2 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                Ready to save
              </span>
            ) : (
              <span className="text-gray-400">Title is required</span>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onClose} disabled={loading}>Cancel</Button>
            <Button size="sm" onClick={handleSave} disabled={!title} loading={loading}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
              Save activity
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
