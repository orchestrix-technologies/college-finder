import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main>
      <h1>404 — Page Not Found</h1>
      <Link to="/">Go home</Link>
    </main>
  );
}
