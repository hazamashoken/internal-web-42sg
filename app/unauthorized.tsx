import { Login } from "@/components/Login";

export default function UnauthorizedPage() {
  return (
    <>
      <h1>401 - Unauthorized</h1>
      <p>Please log in to access this page.</p>
      <Login />
    </>
  );
}
