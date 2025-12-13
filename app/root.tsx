interface ProtectedRouteProps {
  children: ReactNode;
}

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { App as AntdApp } from "antd"; // Đổi tên để tránh conflict
import { useEffect, useState, type FC, type ReactNode } from "react";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useNavigate,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import Header from "./Components/Layouts/Header";
import Sidebar from "./Components/Layouts/Sidebar";
import icon from "./Image/icon.png";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            gcTime: 5 * 60 * 1000,
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg+xml" href={icon} />
        <title>SpendSense</title>

        <Meta />
        <Links />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <AntdApp>{children}</AntdApp>
          {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
        </QueryClientProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const isBrowser = typeof window !== "undefined";
  const token = isBrowser ? sessionStorage.getItem("token") : null;
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isBrowser && !token) {
      navigate("/login", { state: { from: location }, replace: true });
    }
  }, [isBrowser, token, location, navigate]);

  if (!isBrowser || !token) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default function App() {
  const location = useLocation();
  const isAuthRoute = ["/login", "/register"].includes(location.pathname);

  if (isAuthRoute) {
    return <Outlet />;
  }

  // Main App Layout
  return (
    <ProtectedRoute>
      <div className="min-h-screen w-full flex antialiased bg-gray-50">
        <Sidebar />

        <div className="flex flex-col flex-1 min-w-0 md:ml-60">
          {/* Header Section */}

            <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
              <Header/>
            </header>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
            <div className=" mx-auto p-4 md:p-6 lg:p-8 ">
              <Outlet/>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
