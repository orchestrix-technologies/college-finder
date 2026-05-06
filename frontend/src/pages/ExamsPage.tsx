import { useParams } from 'react-router-dom';
import ComingSoon from '@/components/common/ComingSoon';

export default function ExamsPage() {
  const { slug } = useParams<{ slug: string }>();
  const examName = slug ? slug.toUpperCase().replace(/-/g, ' ') : 'Exams';

  return (
    <ComingSoon 
      title={examName} 
      description={`Stay updated with the latest ${examName} dates, registration procedures, syllabus, and cutoff trends for 2026-27.`} 
    />
  );
}
