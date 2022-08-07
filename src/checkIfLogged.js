import { Route, Navigate } from "react-router-dom";

export function IsUserRedirect({ user, loggedInPath, children, ...restProps }) {
  if (!user) {
    return children;
  }

  if (user) {
    return <Navigate to={loggedInPath} />;
  }

  return null;
}

export function ProtectedRoute({ user, children }) {
  if (user) {
    return children;
  }

  return <Navigate to="/SignIn" />;
}
