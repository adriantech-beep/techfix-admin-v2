import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "./components/AdminLayout";
import Homepage from "./pages/Homepage";
import ViewGuidepage from "./pages/ViewGuidepage";
import EditGuidepage from "./pages/EditGuidepage";
import Loginpage from "./pages/Loginpage";
import Signuppage from "./pages/Signuppage";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<Loginpage />} />
          <Route path="/signup" element={<Signuppage />} />
          <Route element={<AdminLayout />}>
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/view-guide" element={<ViewGuidepage />} />
            <Route path="/edit-guide" element={<EditGuidepage />} />
          </Route>
          <Route index element={<Navigate to="/login" replace />} />
        </Routes>
      </HashRouter>
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}

export default App;
