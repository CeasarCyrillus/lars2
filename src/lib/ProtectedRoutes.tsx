import {Navigate, Outlet, useLocation} from "react-router-dom";
import React from "react";
import {withSubscribe} from "./withSubscribe";
import {useIsAuthenticated} from "../state/authState";

export const ProtectedRoutes = withSubscribe(() => {
  const isAuthenticated = useIsAuthenticated()
  console.log("CC: isAuthenticated", isAuthenticated)
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{from: location}}/>;
  }

  return <Outlet/>
}, {fallback: "ProtectedRoutes"})