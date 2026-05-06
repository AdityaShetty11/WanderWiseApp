import { useState } from "react";
import { Link } from "react-router-dom";
import { LogoMark } from "../components/ui";
import { SAMPLE_TRIPS, SampleTrip } from "../data/sampleTrips";

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  Sightseeing:   { bg: "bg-blue-50",   text: "text-blue-700" },
  Food:          { bg: "bg-green-50",  text: "text-green-700" },
  Transport:     { bg: "bg-amber-50",  text: "text-amber-700" },
  Stay:          { bg: "bg-purple-50", text: "text-purple-700" },
  Other:         { bg: "bg-gray-100",  text: "text-gray-600" },
};

export default function LandingPage() {
  const [activeTrip, setActiveTrip] = useState<string | null>(null);

  const selected = SAMPLE_TRIPS.find(t => t.id === activeTrip) ?? null;

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── Navbar ─────────────────────────────────────── */}
      <nav className="sticky top-0 z-40 bg-white border-b border-gray-100 px-5 h-13 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[15px] font-medium text-gray-900">
          <LogoMark />
          WanderWise
        </div>
        <div className="hidden md:flex items-center gap-1 text-sm text-gray-500">
          <a href="#features" className="px-3 py-1.5 rounded-md hover:bg-gray-50 hover:text-gray-800 transition-colors">Features</a>
          <a href="#how-it-works" className="px-3 py-1.5 rounded-md hover:bg-gray-50 hover:text-gray-800 transition-colors">How it works</a>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/login" className="text-sm text-gray-600 border border-gray-200 rounded-lg px-3.5 py-1.5 hover:bg-gray-50 transition-colors font-medium">
            Log in
          </Link>
          <Link to="/signup" className="text-sm text-white rounded-lg px-3.5 py-1.5 font-medium transition-colors hover:opacity-90" style={{ background: "#185FA5" }}>
            Sign up free
          </Link>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────── */}
      <section className="max-w-2xl mx-auto text-center px-5 pt-16 pb-12">
        <div className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full mb-6 border" style={{ background: "#E6F1FB", color: "#0C447C", borderColor: "#B5D4F4" }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#185FA5" }} />
          Plan smarter, travel better
        </div>
        <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-4 tracking-tight">
          Travel smarter,{" "}
          <span style={{ color: "#185FA5" }}>not harder</span>
        </h1>
        <p className="text-base text-gray-500 leading-relaxed mb-8 max-w-md mx-auto">
          WanderWise helps you build structured day-by-day itineraries for any trip — powered by AI suggestions so you never miss the best places.
        </p>
        <div className="flex items-center justify-center gap-3 mb-3">
          <Link
            to="/signup"
            className="text-sm font-medium text-white px-5 py-2.5 rounded-lg transition hover:opacity-90"
            style={{ background: "#185FA5" }}
          >
            Start planning for free
          </Link>
          <a
            href="#how-it-works"
            className="text-sm font-medium text-gray-700 px-5 py-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            See how it works
          </a>
        </div>
        <p className="text-xs text-gray-400">No credit card required · Free to use</p>
      </section>

      {/* ── Sample trips ───────────────────────────────── */}
      <section className="bg-gray-50 border-y border-gray-100 py-12 px-5">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-medium uppercase tracking-widest text-gray-400 text-center mb-2">Explore sample trips</p>
          <h2 className="text-xl font-semibold text-gray-900 text-center mb-2">See what WanderWise looks like</h2>
          <p className="text-sm text-gray-500 text-center mb-8">Click any trip to explore its day-by-day plan.</p>

          {/* 2×2 trip cards */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            {SAMPLE_TRIPS.map(trip => (
              <TripCard
                key={trip.id}
                trip={trip}
                selected={activeTrip === trip.id}
                onClick={() => setActiveTrip(activeTrip === trip.id ? null : trip.id)}
              />
            ))}
          </div>

          {/* Expanded itinerary */}
          {selected && (
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden animate-fade-in">
              {/* itinerary header */}
              <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-3">
                <div className="w-1 h-10 rounded-full flex-shrink-0" style={{ background: selected.accent }} />
                <div className="flex-1">
                  <div className="text-sm font-semibold text-gray-900">{selected.title}</div>
                  <div className="text-xs text-gray-500">{selected.destination} · {selected.dates}</div>
                </div>
                <span className="text-[10px] font-medium px-2 py-1 rounded-full" style={{ background: "#E6F1FB", color: "#0C447C" }}>
                  Sample itinerary
                </span>
              </div>

              {/* days */}
              {selected.itinerary.map(day => (
                <div key={day.day} className="border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-2.5 px-5 py-3">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: selected.accent }} />
                    <span className="text-xs font-semibold text-gray-700">{day.day}</span>
                    <span className="text-xs text-gray-400 ml-auto">{day.date}</span>
                  </div>
                  <div className="px-5 pb-3 space-y-2">
                    {day.activities.map((act, i) => {
                      const cat = CATEGORY_COLORS[act.category] ?? CATEGORY_COLORS.Other;
                      return (
                        <div key={i} className="flex items-start gap-2.5">
                          <span className="text-[10px] text-gray-400 font-mono w-9 flex-shrink-0 mt-0.5">{act.time}</span>
                          <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded flex-shrink-0 ${cat.bg} ${cat.text}`}>{act.category}</span>
                          <div>
                            <div className="text-xs font-medium text-gray-800">{act.name}</div>
                            <div className="text-[10px] text-gray-400">{act.location}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* CTA */}
              <div className="px-5 py-3 bg-gray-50 flex items-center justify-between">
                <span className="text-xs text-gray-500">Want to build your own itinerary like this?</span>
                <Link
                  to="/signup"
                  className="text-xs font-medium text-white px-3 py-1.5 rounded-lg transition hover:opacity-90"
                  style={{ background: "#185FA5" }}
                >
                  Create free account →
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Features ───────────────────────────────────── */}
      <section id="features" className="py-16 px-5">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-medium uppercase tracking-widest text-center mb-2" style={{ color: "#185FA5" }}>Features</p>
          <h2 className="text-xl font-semibold text-gray-900 text-center mb-10">Everything you need to plan a great trip</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: "📅", title: "Day-by-day itinerary", desc: "Structure your trip automatically. Add activities, times, and locations to each day." },
              { icon: "✨", title: "AI-powered suggestions", desc: "Get smart recommendations for any destination, tailored to your trip dates." },
              { icon: "🔒", title: "Your trips, your data", desc: "Each account is private. Only you can see and edit your trips." },
              { icon: "📱", title: "Works everywhere", desc: "Plan at home on desktop, check on mobile. Your data syncs in real time." },
            ].map(f => (
              <div key={f.title} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <div className="text-2xl mb-3">{f.icon}</div>
                <div className="text-sm font-semibold text-gray-900 mb-1.5">{f.title}</div>
                <div className="text-xs text-gray-500 leading-relaxed">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ───────────────────────────────── */}
      <section id="how-it-works" className="bg-gray-50 border-y border-gray-100 py-16 px-5">
        <div className="max-w-lg mx-auto">
          <h2 className="text-xl font-semibold text-gray-900 text-center mb-10">How it works</h2>
          <div className="space-y-0">
            {[
              { n: 1, title: "Create a free account", desc: "Sign up with your email in seconds. No credit card, no setup." },
              { n: 2, title: "Create your trip", desc: "Add a name, destination, and date range. WanderWise generates a day-by-day structure automatically." },
              { n: 3, title: "Fill in your itinerary", desc: "Add activities to each day — time, category, location, notes. Or let AI suggest the best places." },
              { n: 4, title: "Travel with confidence", desc: "Open WanderWise on any device during your trip. Everything is saved and ready." },
            ].map((step, i) => (
              <div key={step.n} className={`flex gap-4 py-5 ${i < 3 ? "border-b border-gray-200" : ""}`}>
                <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white mt-0.5" style={{ background: "#185FA5" }}>
                  {step.n}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900 mb-1">{step.title}</div>
                  <div className="text-sm text-gray-500 leading-relaxed">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────── */}
      <section className="py-16 px-5 text-center">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Ready to plan your next trip?</h2>
          <p className="text-sm text-gray-500 leading-relaxed mb-7">
            Join WanderWise and start building itineraries that make sense — day by day, activity by activity.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link to="/signup" className="text-sm font-medium text-white px-5 py-2.5 rounded-lg hover:opacity-90 transition" style={{ background: "#185FA5" }}>
              Create a free account →
            </Link>
            <Link to="/login" className="text-sm font-medium text-gray-700 px-5 py-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition">
              Log in
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────── */}
      <footer className="border-t border-gray-100 px-5 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <LogoMark size={20} />
          WanderWise
        </div>
        <span className="text-xs text-gray-400">© 2026 WanderWise</span>
        <div className="flex gap-4 text-xs text-gray-400">
          <span className="hover:text-gray-600 cursor-pointer">Privacy</span>
          <span className="hover:text-gray-600 cursor-pointer">Terms</span>
        </div>
      </footer>
    </div>
  );
}

// ── Trip card sub-component ──────────────────────────────
function TripCard({ trip, selected, onClick }: { trip: SampleTrip; selected: boolean; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border overflow-hidden cursor-pointer transition-all ${selected ? "border-[#185FA5] shadow-sm" : "border-gray-200 hover:border-gray-300"}`}
      style={{ borderWidth: selected ? "1.5px" : undefined }}
    >
      {/* image */}
      <div className="relative h-[100px] overflow-hidden bg-gray-100">
        <img src={trip.image} alt={trip.destination} className="w-full h-full object-cover" />
        <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: trip.accent }} />
        <div className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-white flex items-center justify-center text-sm border border-white/80 shadow-sm">
          {trip.flag}
        </div>
      </div>
      {/* body */}
      <div className="p-3">
        <div className="text-xs font-semibold text-gray-900 mb-0.5">{trip.title}</div>
        <div className="text-[10px] text-gray-500 flex items-center gap-1 mb-2">
          <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.2" /><path d="M6 1C3.8 1 2 2.8 2 5c0 3 4 7 4 7s4-4 4-7c0-2.2-1.8-4-4-4z" stroke="currentColor" strokeWidth="1.2" fill="none" /></svg>
          {trip.destination}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-1.5">
            <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{trip.dates}</span>
            <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{trip.days}d</span>
          </div>
          <span className={`text-[10px] font-medium transition-colors ${selected ? "text-[#185FA5]" : "text-gray-400"}`}>
            {selected ? "Close ↑" : "View →"}
          </span>
        </div>
      </div>
    </div>
  );
}
