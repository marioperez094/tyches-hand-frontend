//External Imports
import { Outlet } from "react-router";

export default function ProtectedRoutes({ 
  isAuthenticated 
} : {
  isAuthenticated: boolean;
}) {
  console.log("render ProtectedRoutes")

  return isAuthenticated ? (
    <Outlet />
  ) : null;
}