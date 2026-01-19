import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <p className="text-xl text-gray-400">Page Not Found</p>
      <Link to="/">
        <Button>Back to Home</Button>
      </Link>
    </div>
  );
}
