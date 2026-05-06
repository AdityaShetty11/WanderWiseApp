import { Link } from "react-router-dom";
import { LogoMark } from "../components/ui";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="bg-white border-b border-gray-100 px-5 h-13 flex items-center">
        <Link to="/" className="flex items-center gap-2 text-[15px] font-medium text-gray-900">
          <LogoMark />
          WanderWise
        </Link>
      </nav>
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center max-w-sm w-full shadow-sm">
          <div className="w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center" style={{ background: "#E6F1FB" }}>
            <span className="text-3xl font-bold" style={{ color: "#185FA5" }}>?</span>
          </div>
          <h1 className="text-lg font-semibold text-gray-900 mb-2">Page not found</h1>
          <p className="text-sm text-gray-500 mb-6">The page you're looking for doesn't exist or has been moved.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-white px-5 py-2.5 rounded-lg hover:opacity-90 transition"
            style={{ background: "#185FA5" }}
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
