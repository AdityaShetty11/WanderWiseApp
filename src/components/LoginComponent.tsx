import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input, Alert } from "./ui";
import { AuthNavComponent } from "./AuthNavComponent";

export function LoginComponent() {
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]   = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setError("Firebase not yet configured — this is a UI preview.");
  }

  return (
    <AuthNavComponent>
      {/* header */}
      <div className="text-center mb-6">
        <div className="w-11 h-11 rounded-xl mx-auto mb-4 flex items-center justify-center" style={{ background: "#E6F1FB" }}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <rect x="3" y="4" width="16" height="14" rx="3" stroke="#185FA5" strokeWidth="1.4" />
            <path d="M8 11h6M11 8v6" stroke="#185FA5" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </div>
        <h1 className="text-lg font-semibold text-gray-900 mb-1">Welcome back</h1>
        <p className="text-sm text-gray-500">Log in to continue planning your trips.</p>
      </div>

      {error && <div className="mb-4"><Alert type="error" message={error} /></div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="email" label="Email address" type="email"
          placeholder="you@example.com" value={email}
          onChange={setEmail} required disabled={loading}
        />
        <div>
          <Input
            id="password" label="Password" type={showPw ? "text" : "password"}
            placeholder="Your password" value={password}
            onChange={setPassword} required disabled={loading}
            rightElement={
              <button type="button" onClick={() => setShowPw(!showPw)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><ellipse cx="8" cy="8" rx="7" ry="5" stroke="currentColor" strokeWidth="1.2" /><circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.2" /></svg>
              </button>
            }
          />
          <div className="text-right mt-1">
            <span className="text-xs cursor-pointer hover:underline" style={{ color: "#185FA5" }}>Forgot password?</span>
          </div>
        </div>

        <Button type="submit" fullWidth loading={loading} disabled={!email || !password}>
          Log in
        </Button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-5">
        Don't have an account?{" "}
        <Link to="/signup" className="font-medium" style={{ color: "#185FA5" }}>Sign up free</Link>
      </p>
    </AuthNavComponent>
  );
}
