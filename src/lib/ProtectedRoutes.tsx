import {useIsAuthenticated} from "../state/authState";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import React from "react";

export const ProtectedRoutes = () => {
  const isAuthenticated = useIsAuthenticated()
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{from: location}}/>;
  }

  return <Outlet/>
}