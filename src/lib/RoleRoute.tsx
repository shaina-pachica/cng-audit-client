import { useAuth } from "@/provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";

interface RoleRouteProps {
  role: "Owner" | "Employee";
  children: ReactNode;
}

export default function RoleRoute({ role, children }: RoleRouteProps) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const primaryRole = user.roles.includes("Owner") ? "Owner" : "Employee";
  const expectedBasePath = primaryRole === "Owner" ? "/owner" : "/employee";

  if (role !== primaryRole) {
    return (
      <Navigate
        to={`${expectedBasePath}/dashboard`}
        replace
        state={{ from: location }}
      />
    );
  }

  return children;
}
