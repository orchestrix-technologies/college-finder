import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import CollegesPage from "@/pages/CollegesPage";
import CollegeDetailPage from "@/pages/CollegeDetailPage";
import CoursesPage from "@/pages/CoursesPage";
import RankingsPage from "@/pages/RankingsPage";
import ExamsPage from "@/pages/ExamsPage";
import GeneralComingSoonPage from "@/pages/GeneralComingSoonPage";
import NotFoundPage from "@/pages/NotFoundPage";
import ScrollToTop from "@/components/common/ScrollToTop";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/colleges" element={<CollegesPage />} />
        <Route path="/colleges/:slug" element={<CollegeDetailPage />} />
        
        {/* Dynamic Coming Soon Sections */}
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:slug" element={<CoursesPage />} />
        
        <Route path="/rankings" element={<RankingsPage />} />
        <Route path="/rankings/:slug" element={<RankingsPage />} />
        
        <Route path="/exams" element={<ExamsPage />} />
        <Route path="/exams/:slug" element={<ExamsPage />} />

        {/* Tools & Quick Links */}
        <Route path="/tools/predictor" element={<GeneralComingSoonPage />} />
        <Route path="/compare" element={<GeneralComingSoonPage />} />
        <Route path="/scholarships" element={<GeneralComingSoonPage />} />
        <Route path="/study-abroad" element={<GeneralComingSoonPage />} />
        <Route path="/careers" element={<GeneralComingSoonPage />} />
        <Route path="/news" element={<GeneralComingSoonPage />} />
        
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
