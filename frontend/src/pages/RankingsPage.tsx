import { useParams } from 'react-router-dom';
import ComingSoon from '@/components/common/ComingSoon';

export default function RankingsPage() {
  const { slug } = useParams<{ slug: string }>();
  const rankingTitle = slug ? `${slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} Rankings` : 'Rankings';

  return (
    <ComingSoon 
      title={rankingTitle} 
      description={`The most accurate and up-to-date ${rankingTitle} based on placement data, faculty quality, and verified student feedback will be published here soon.`} 
    />
  );
}
