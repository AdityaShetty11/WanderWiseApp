import { useState } from "react";
import { Button, Input } from "./ui";
import { COVER_COLORS, formatDateShort, daysBetween } from "../utils/helpers";

export function CreateTripModalComponent({ onClose, onCreated }: { onClose: () => void; onCreated: (id: string) => void }) {
  const [title, setTitle]       = useState("");
  const [dest, setDest]         = useState("");
  const [desc, setDesc]         = useState("");
  const [startDate, setStart]   = useState("");
  const [endDate, setEnd]       = useState("");
  const [color, setColor]       = useState(COVER_COLORS[0].value);
  const [loading, setLoading]   = useState(false);
  const [dateError, setDateError] = useState("");

  const days = startDate && endDate && !dateError ? daysBetween(startDate, endDate) : 0;
  const canCreate = title && dest && startDate && endDate && !dateError;

  function handleDates(start: string, end: string) {
    if (start && end && end < start) setDateError("End date must be after start date");
    else setDateError("");
  }

  async function handleCreate() {
    if (!canCreate) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    onCreated("preview-trip-id");
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
          <Input id="title" label="Trip title" placeholder="e.g. Summer in Japan" value={title} onChange={setTitle} required />
          <Input id="dest"  label="Destination" placeholder="e.g. Tokyo, Japan" value={dest}  onChange={setDest}  required />
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">
              Description <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <textarea
              placeholder="What's this trip about?"
              value={desc}
              onChange={e => setDesc(e.target.value)}
              rows={2}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white text-gray-900 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input
              id="start" label="Start date" type="date" value={startDate}
              onChange={v => { setStart(v); handleDates(v, endDate); }} required
            />
            <Input
              id="end"   label="End date"   type="date" value={endDate}
              onChange={v => { setEnd(v);   handleDates(startDate, v); }} required
              error={dateError}
            />
          </div>

          {/* day preview */}
          {days > 0 && (
            <div className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg border" style={{ background: "#E6F1FB", color: "#0C447C", borderColor: "#B5D4F4" }}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="6" stroke="currentColor" strokeWidth="1"/><path d="M6.5 4.5V7l1.5 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
              {days} day{days !== 1 ? "s" : ""} will be auto-generated from {formatDateShort(startDate)} to {formatDateShort(endDate)}
            </div>
          )}

          {/* colour picker */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-2">Cover colour</label>
            <div className="flex gap-2">
              {COVER_COLORS.map(c => (
                <button
                  key={c.value}
                  type="button"
                  title={c.label}
                  onClick={() => setColor(c.value)}
                  className="w-7 h-7 rounded-full transition-transform"
                  style={{
                    background: c.value,
                    outline: color === c.value ? `2px solid ${c.value}` : undefined,
                    outlineOffset: color === c.value ? "2px" : undefined,
                    transform: color === c.value ? "scale(1.15)" : undefined,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-2">
          <Button variant="outline" onClick={onClose} disabled={loading}>Cancel</Button>
          <Button onClick={handleCreate} disabled={!canCreate} loading={loading}>Create trip</Button>
        </div>
      </div>
    </div>
  );
}
