// This admin page has been removed. Redirect to home.
import { Navigate } from "@tanstack/react-router";

export default function Patients() {
  return <Navigate to="/" />;
}
