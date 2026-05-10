import { useGetMeQuery } from "@/redux/features/auth/auth.api";
import type { ComponentType } from "react";
import { Navigate } from "react-router-dom";

// Higher-order component to wrap public routes and redirect authenticated users
export const withPublic = (Component: ComponentType) => {
  return function PublicWrapper() {
    const { data, isLoading } = useGetMeQuery(undefined);

    if (isLoading) {
      return null;
    }

    if (!isLoading && data?.data) {
      return <Navigate to="/" replace />;
    }
    return <Component />;
  };
};
