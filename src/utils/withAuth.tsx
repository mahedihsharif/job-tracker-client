import DashboardSkeleton from "@/components/skeleton/DashboardSkeleton";
import { useGetMeQuery } from "@/redux/features/auth/auth.api";
import type { ComponentType } from "react";
import { Navigate } from "react-router-dom";

// Higher-order component to wrap protected routes and check for authentication
export const withAuth = (Component: ComponentType) => {
  return function AuthWrapper() {
    const { data, isLoading } = useGetMeQuery(undefined);

    if (isLoading) {
      return <DashboardSkeleton />;
    }

    if (!isLoading && !data?.data) {
      return <Navigate to="/login" replace />;
    }
    return <Component />;
  };
};
