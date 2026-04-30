import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import CollegesPage from "@/pages/CollegesPage";
import CollegeDetailPage from "@/pages/CollegeDetailPage";
import CoursesPage from "@/pages/CoursesPage";
import NotFoundPage from "@/pages/NotFoundPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/colleges" element={<CollegesPage />} />
        <Route path="/colleges/:slug" element={<CollegeDetailPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
