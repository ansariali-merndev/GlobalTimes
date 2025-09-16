import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Home } from "./components/pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { ClerkProvider } from "@clerk/clerk-react";
import { Authenticate } from "./components/pages/Authenticate";
import { Fallback } from "./components/pages/Fallback";
import { shadesOfPurple } from "@clerk/themes";
import { History } from "./components/pages/History";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/history",
        element: <History />,
      },
      {
        path: "/login",
        element: <Authenticate />,
      },
      {
        path: "/login/sso-callback",
        element: <Fallback />,
      },
      {
        path: "/register",
        element: <Authenticate />,
      },
    ],
  },
]);

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider
        appearance={{ theme: shadesOfPurple }}
        publishableKey={PUBLISHABLE_KEY}
      >
        <RouterProvider router={router}></RouterProvider>
        <ReactQueryDevtools initialIsOpen={true} />
      </ClerkProvider>
    </QueryClientProvider>
  );
}

export default App;
