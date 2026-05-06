import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button, Input, Alert } from "./ui";
import { AuthNavComponent } from "./AuthNavComponent";
import { getAuthErrorMessage } from "../auth/authErrors";
import { useAuth } from "../context/AuthContext";

export function SignupComponent() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]   = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [info, setInfo]       = useState("");

  // Password strength
  const strength = (() => {
    if (!password) return 0;
    let s = 0;
    if (password.length >= 6)  s++;
    if (password.length >= 10) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^a-zA-Z0-9]/.test(password)) s++;
    return s;
  })();
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = ["", "bg-red-400", "bg-amber-400", "bg-blue-400", "bg-green-500"][strength];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setInfo("");
    setLoading(true);

    try {
      await signUp(email, password);
      setInfo("Account created. Taking you to your dashboard now.");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthNavComponent>
      {/* header */}
      <div className="text-center mb-6">
        <div className="w-11 h-11 rounded-xl mx-auto mb-4 flex items-center justify-center" style={{ background: "#E6F1FB" }}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <circle cx="11" cy="8" r="4" stroke="#185FA5" strokeWidth="1.4" />
            <path d="M3 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#185FA5" strokeWidth="1.4" strokeLinecap="round" />
            <path d="M16 4l1.5 1.5L20 3" stroke="#1D9E75" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 className="text-lg font-semibold text-gray-900 mb-1">Create your account</h1>
        <p className="text-sm text-gray-500">Free forever. No credit card required.</p>
      </div>

      {error && <div className="mb-4"><Alert type="error" message={<>{error} <Link to="/login" className="font-medium underline">Log in instead?</Link></>} /></div>}
      {info && <div className="mb-4"><Alert type="success" message={info} /></div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="email" label="Email address" type="email"
          placeholder="you@example.com" value={email}
          onChange={setEmail} required disabled={loading}
        />
        <div>
          <Input
            id="password" label="Password" type={showPw ? "text" : "password"}
            placeholder="Minimum 6 characters" value={password}
            onChange={setPassword} required disabled={loading}
            rightElement={
              <button type="button" onClick={() => setShowPw(!showPw)} className="text-gray-400 hover:text-gray-600 transition-colors">
                {showPw
                  ? <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 2l12 12M6.5 6.6A2 2 0 0110 9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /><path d="M8 3C4.5 3 2 8 2 8s.9 1.8 2.5 3M8 3c3.5 0 6 5 6 5s-.8 1.6-2.2 2.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
                  : <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><ellipse cx="8" cy="8" rx="7" ry="5" stroke="currentColor" strokeWidth="1.2" /><circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.2" /></svg>}
              </button>
            }
          />
          {/* strength bar */}
          {password && (
            <div className="mt-2">
              <div className="flex gap-1 mb-1">
                {[1,2,3,4].map(i => (
                  <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= strength ? strengthColor : "bg-gray-200"}`} />
                ))}
              </div>
              <p className={`text-xs ${strength <= 1 ? "text-red-500" : strength === 2 ? "text-amber-500" : strength === 3 ? "text-blue-500" : "text-green-600"}`}>
                {strengthLabel}
              </p>
            </div>
          )}
        </div>

        <Button type="submit" fullWidth loading={loading} disabled={!email || !password}>
          Create account
        </Button>
      </form>

      <p className="text-center text-[11px] text-gray-400 mt-4 leading-relaxed">
        By creating an account you agree to our{" "}
        <span className="underline cursor-pointer">Terms</span> and{" "}
        <span className="underline cursor-pointer">Privacy Policy</span>
      </p>

      <p className="text-center text-sm text-gray-500 mt-4">
        Already have an account?{" "}
        <Link to="/login" className="font-medium" style={{ color: "#185FA5" }}>Log in</Link>
      </p>
    </AuthNavComponent>
  );
}
