import { useParams } from "react-router-dom";

export default function CollegeDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  return (
    <main>
      <h1>College: {slug}</h1>
    </main>
  );
}
