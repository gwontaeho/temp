import { AxiosInterceptor } from "components/AxiosInterceptor";
import ErrorFallback from "components/ErrorFallback";
import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet, useLocation } from "react-router-dom";

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AxiosInterceptor />
      <Outlet />
    </ErrorBoundary>
  );
}
