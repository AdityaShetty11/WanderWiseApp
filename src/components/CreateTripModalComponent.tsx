import { useState } from "react";
import { Button, Input, Alert } from "./ui";
import { COVER_COLORS, formatDateShort, daysBetween, buildDaysFromRange, generateId } from "../utils/helpers";
import { createTrip } from "../services/tripService";
import { Trip } from "../types";

export function CreateTripModalComponent({ userId, onClose, onCreated }: { userId: string; onClose: () => void; onCreated?: (id: string) => void }) {
  const [title, setTitle] = useState("");
  const [dest, setDest] = useState("");
  const [desc, setDesc] = useState("");
  const [startDate, setStart] = useState("");
  const [endDate, setEnd] = useState("");
  const [color, setColor] = useState(COVER_COLORS[0].value);
  const [loading, setLoading] = useState(false);
  const [dateError, setDateError] = useState("");
  const [tripError, setTripError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const days = startDate && endDate && !dateError ? daysBetween(startDate, endDate) : 0;
  const canCreate = Boolean(title && dest && startDate && endDate && !dateError);

  function handleDates(start: string, end: string) {
    if (start && end && end < start) setDateError("End date must be after start date");
    else setDateError("");
  }

  async function handleCreate() {
    if (!canCreate) return;
    setLoading(true);
    setTripError("");
    setSuccessMsg("");

    try {
      const newTrip: Trip = {
        id: generateId(),
        title,
        destination: dest,
        description: desc,
        startDate,
        endDate,
        coverColor: color,
        userId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        days: buildDaysFromRange(startDate, endDate),
      };

      // Debug logs
      // eslint-disable-next-line no-console
      console.debug("CreateTrip: userId=", userId);
      // eslint-disable-next-line no-console
      console.debug("CreateTrip: payload=", newTrip);

      // Save and get created id
      const created = await createTrip(userId, newTrip);

      // Show success and clear
      setSuccessMsg(`Trip created successfully! 🎉 (id: ${created.id})`);
      setTitle("");
      setDest("");
      setDesc("");
      setStart("");
      setEnd("");
      setColor(COVER_COLORS[0].value);

      // Notify parent and close
      if (onCreated) {
        try { onCreated(created.id); } catch (_) {}
      }
      // eslint-disable-next-line no-console
      console.debug("CreateTrip: calling onClose()");
      onClose();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("CreateTrip error:", error);
      setTripError((error as Error).message || "Failed to create trip. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        {/* header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">Create a new trip</h2>
          <button onClick={onClose} className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors text-sm">✕</button>
        </div>

        {/* body */}
        <div className="px-6 py-5 space-y-4">
          {tripError && <Alert type="error" message={tripError} />}
          {successMsg && <Alert type="success" message={successMsg} />}

          <Input id="title" label="Trip title" placeholder="e.g. Summer in Japan" value={title} onChange={setTitle} required />
          <Input id="dest" label="Destination" placeholder="e.g. Tokyo, Japan" value={dest} onChange={setDest} required />
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Description <span className="text-gray-400 font-normal">(optional)</span></label>
            <textarea
              placeholder="What's this trip about?"
              value={desc}
              onChange={e => setDesc(e.target.value)}
              rows={2}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white text-gray-900 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input id="start" label="Start date" type="date" value={startDate} onChange={v => { setStart(v); handleDates(v, endDate); }} required />
            <Input id="end" label="End date" type="date" value={endDate} onChange={v => { setEnd(v); handleDates(startDate, v); }} required error={dateError} />
          </div>

          {days > 0 && (
            <div className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg border" style={{ background: "#E6F1FB", color: "#0C447C", borderColor: "#B5D4F4" }}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="6" stroke="currentColor" strokeWidth="1"/><path d="M6.5 4.5V7l1.5 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
              {days} day{days !== 1 ? "s" : ""} will be auto-generated from {formatDateShort(startDate)} to {formatDateShort(endDate)}
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-2">Cover colour</label>
            <div className="flex gap-2">
              {COVER_COLORS.map(c => (
                <button key={c.value} type="button" title={c.label} onClick={() => setColor(c.value)} className="w-7 h-7 rounded-full transition-transform" style={{ background: c.value, outline: color === c.value ? `2px solid ${c.value}` : undefined, outlineOffset: color === c.value ? "2px" : undefined, transform: color === c.value ? "scale(1.15)" : undefined }} />
              ))}
            </div>
          </div>
        </div>

        {/* footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-2">
          <Button variant="outline" onClick={onClose} disabled={loading}>Cancel</Button>
          <Button onClick={() => { void handleCreate(); }} disabled={!canCreate} loading={loading}>Create Trip</Button>
        </div>
      </div>
    </div>
  );
}
