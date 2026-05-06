import { Link } from "react-router-dom";

import Header from "@/components/common/Header";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <Header />
      <main className="max-w-7xl mx-auto px-4 text-center py-20">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404 — Page Not Found</h1>
        <p className="text-gray-600 mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="inline-flex items-center justify-center px-6 py-3 bg-primary-700 text-white font-bold rounded-xl hover:bg-primary-800 transition-all">
          Go home
        </Link>
      </main>
    </div>
  );
}
