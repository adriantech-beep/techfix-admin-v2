import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "./components/AdminLayout";
import Homepage from "./pages/Homepage";
import ViewGuidepage from "./pages/ViewGuidepage";
import EditGuidepage from "./pages/EditGuidepage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <Routes>
          <Route element={<AdminLayout />}>
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/view-guide" element={<ViewGuidepage />} />
            <Route path="/edit-guide" element={<EditGuidepage />} />
          </Route>
          <Route index element={<Navigate to="/homepage" replace />} />
        </Routes>
      </HashRouter>
    </QueryClientProvider>
  );
}

export default App;
