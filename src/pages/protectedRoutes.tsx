//External Imports
import { Outlet } from "react-router";

//Context
import { CardProvider } from "../context/card";

export default function ProtectedRoutes({ 
  isAuthenticated 
} : {
  isAuthenticated: boolean;
}) {
  console.log("render ProtectedRoutes")

  return isAuthenticated ? (
    <CardProvider>
      <Outlet />
    </CardProvider>
  ) : null;
}