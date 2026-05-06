import { useLocation } from 'react-router-dom';
import ComingSoon from '@/components/common/ComingSoon';

export default function GeneralComingSoonPage() {
  const { pathname } = useLocation();
  const pageName = pathname.split('/').pop()?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Feature';

  return (
    <ComingSoon 
      title={pageName} 
      description={`The ${pageName} tool is currently under development. We're working hard to bring you the best-in-class features for your college search journey.`} 
    />
  );
}
