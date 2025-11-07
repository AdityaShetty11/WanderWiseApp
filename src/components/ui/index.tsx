import { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";

// ── Logo mark ────────────────────────────────────────────
export function LogoMark({ size = 24 }: { size?: number }) {
  return (
    <div
      className="rounded-md flex items-center justify-center flex-shrink-0"
      style={{ width: size, height: size, background: "#185FA5" }}
    >
      <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 13 13" fill="none">
        <path d="M2 9 Q6.5 2 11 9" stroke="#E6F1FB" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="6.5" cy="9" r="1.5" fill="#E6F1FB" />
      </svg>
    </div>
  );
}

// ── Public navbar (landing, auth pages) ──────────────────
interface PublicNavProps {
  rightSlot?: ReactNode;
}
export function PublicNav({ rightSlot }: PublicNavProps) {
  return (
    <nav className="bg-white border-b border-gray-100 px-5 h-13 flex items-center justify-between sticky top-0 z-40">
      <Link to="/" className="flex items-center gap-2 text-gray-900 font-medium text-[15px]">
        <LogoMark />
        WanderWise
      </Link>
      {rightSlot}
    </nav>
  );
}

// ── App navbar (authenticated pages) ────────────────────
interface AppNavProps {
  email?: string;
  onLogout?: () => void;
  backLabel?: string;
  backTo?: string;
}
export function AppNav({ email, onLogout, backLabel, backTo }: AppNavProps) {
  const navigate = useNavigate();
  return (
    <nav className="bg-white border-b border-gray-100 px-5 h-13 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-3">
        {backLabel && backTo ? (
          <button
            onClick={() => navigate(backTo)}
            className="flex items-center gap-1.5 text-sm text-gray-500 border border-gray-200 rounded-md px-2.5 py-1 hover:bg-gray-50 transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M8 2L4 6l4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {backLabel}
          </button>
        ) : (
          <Link to="/dashboard" className="flex items-center gap-2 text-gray-900 font-medium text-[15px]">
            <LogoMark />
            WanderWise
          </Link>
        )}
      </div>
      <div className="flex items-center gap-3">
        {email && <span className="text-sm text-gray-500 hidden sm:block">{email}</span>}
        <div className="w-7 h-7 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-[11px] font-medium text-blue-700">
          {email ? email[0].toUpperCase() : "?"}
        </div>
        {onLogout && (
          <button
            onClick={onLogout}
            className="text-xs text-gray-400 border border-gray-200 rounded-md px-2.5 py-1 hover:bg-gray-50 transition-colors"
          >
            Log out
          </button>
        )}
      </div>
    </nav>
  );
}

// ── Button ───────────────────────────────────────────────
interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
export function Button({
  children, onClick, type = "button", variant = "primary",
  size = "md", disabled, loading, fullWidth, className = "",
}: ButtonProps) {
  const base = "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-[#185FA5] text-white hover:bg-[#0C447C]",
    outline: "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50",
    ghost:   "bg-transparent text-gray-600 hover:bg-gray-100",
    danger:  "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100",
  };
  const sizes = {
    sm: "text-xs px-3 py-1.5",
    md: "text-sm px-4 py-2",
    lg: "text-sm px-5 py-2.5",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? "w-full" : ""} ${className}`}
    >
      {loading && (
        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" />
          <path d="M12 2a10 10 0 0110 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      )}
      {children}
    </button>
  );
}

// ── Input field ──────────────────────────────────────────
interface InputProps {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  hint?: string;
  required?: boolean;
  disabled?: boolean;
  rightElement?: ReactNode;
}
export function Input({
  label, id, type = "text", placeholder, value, onChange,
  error, hint, required, disabled, rightElement,
}: InputProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-medium text-gray-600 mb-1.5">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          disabled={disabled}
          className={`w-full border rounded-lg px-3 py-2 text-sm bg-white text-gray-900 placeholder-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-400
            ${error ? "border-red-400 bg-red-50" : "border-gray-200 hover:border-gray-300"}
            ${rightElement ? "pr-10" : ""}
          `}
        />
        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightElement}</div>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
          <circle cx="5.5" cy="5.5" r="5" stroke="currentColor" strokeWidth="1" />
          <path d="M5.5 3.5v2.5M5.5 7.5h.01" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        {error}
      </p>}
      {hint && !error && <p className="mt-1 text-xs text-gray-400">{hint}</p>}
    </div>
  );
}

// ── Alert banner ─────────────────────────────────────────
interface AlertProps {
  type: "error" | "success" | "info";
  message: ReactNode;
}
export function Alert({ type, message }: AlertProps) {
  const styles = {
    error:   "bg-red-50 border-red-200 text-red-800",
    success: "bg-green-50 border-green-200 text-green-800",
    info:    "bg-blue-50 border-blue-200 text-blue-800",
  };
  const icons = {
    error:   "⚠",
    success: "✓",
    info:    "ℹ",
  };
  return (
    <div className={`flex items-start gap-2.5 border rounded-lg px-3.5 py-2.5 text-sm ${styles[type]}`}>
      <span className="mt-0.5 flex-shrink-0">{icons[type]}</span>
      <span>{message}</span>
    </div>
  );
}

// ── Pill / badge ─────────────────────────────────────────
export function Pill({ label, className = "" }: { label: string; className?: string }) {
  return (
    <span className={`inline-flex items-center text-[11px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 ${className}`}>
      {label}
    </span>
  );
}
