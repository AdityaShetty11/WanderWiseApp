import { Link } from "react-router-dom";
import { LogoMark } from "./ui";

export function AuthNavComponent({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* nav */}
      <nav className="bg-white border-b border-gray-100 px-5 h-13 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-[15px] font-medium text-gray-900">
          <LogoMark />
          WanderWise
        </Link>
        <Link to="/" className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to home
        </Link>
      </nav>

      {/* centred card */}
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="bg-white border border-gray-200 rounded-2xl p-7 w-full max-w-sm shadow-sm">
          {children}
        </div>
      </div>
    </div>
  );
}
