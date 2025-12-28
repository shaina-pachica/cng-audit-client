import { keepPreviousData, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./provider/AuthProvider";
import RoleRoute from "./lib/RoleRoute";
import OwnerDashboardPage from "./dashboard/owner/page";
import EmployeeDashboardPage from "./dashboard/employee/page";
import Login from "./Login";
import { Toaster } from "sonner";

export default function App() {
  const queryClient: QueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        gcTime: 1000 * 60 * 60 * 24,
        placeholderData: keepPreviousData
      }
    }
  })
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route
              path="/owner/*"
              element={
                <RoleRoute role="Owner">
                  <OwnerDashboardPage />
                </RoleRoute>
              }
            />
            <Route
              path="/employee/*"
              element={
                <RoleRoute role="Employee">
                  <EmployeeDashboardPage />
                </RoleRoute>
              }
            />
            <Route element={<Login />} path="/login" index />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
      <Toaster />
    </QueryClientProvider>

  )

}
