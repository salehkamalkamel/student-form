import { useCheckAdmin } from "../hooks/useCheckAdmin";
import Container from "./Container";
import Spinner from "./Spinner";

export default function ProtectedRoute({ children }) {
  const { isAdmin, isLoading, error } = useCheckAdmin(); // Now using the query

  if (isLoading) {
    return (
      <Container>
        <Spinner />
      </Container>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Show an error if something went wrong
  }

  if (isAdmin) {
    return children; // Render children if the user is an admin
  }

  return <div>You do not have access to this page.</div>; // If not an admin, restrict access
}
