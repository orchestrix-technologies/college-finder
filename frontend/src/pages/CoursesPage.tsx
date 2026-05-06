import { useParams } from 'react-router-dom';
import ComingSoon from '@/components/common/ComingSoon';

export default function CoursesPage() {
  const { slug } = useParams<{ slug: string }>();
  const courseName = slug ? slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Courses';

  return (
    <ComingSoon 
      title={courseName} 
      description={`Detailed information about ${courseName} programs, specializations, career prospects, and top colleges will be available soon.`} 
    />
  );
}
