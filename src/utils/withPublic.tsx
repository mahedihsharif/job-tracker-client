import { useGetMeQuery } from "@/redux/features/auth/auth.api";
import type { ComponentType } from "react";
import { Navigate } from "react-router-dom";

export const withPublic = (Component: ComponentType) => {
  return function PublicWrapper() {
    const { data, isLoading } = useGetMeQuery(undefined, {
      refetchOnMountOrArgChange: true,
    });

    if (isLoading) {
      return null;
    }

    if (!isLoading && data?.data) {
      return <Navigate to="/" replace />;
    }
    return <Component />;
  };
};
