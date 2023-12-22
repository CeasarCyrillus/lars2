import {useIsLoggedIn} from "../state/authState";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import React from "react";
import {withSubscribe} from "./withSubscribe";

export const ProtectedRoutes = withSubscribe(() => {
  const isAuthenticated = useIsLoggedIn()
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{from: location}}/>;
  }

  return <Outlet/>
}, {fallback: "ProtectedRoutes"})