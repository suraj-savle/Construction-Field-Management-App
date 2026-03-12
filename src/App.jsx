import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { useAuth } from "./context/useAuth"; // <--- Add this import
import Login from "./pages/Login";
import ProjectList from "./pages/ProjectList";
import DPRForm from "./pages/DPRForm";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth(); // <--- Change AuthProvider() to useAuth()
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/projects"
            element={
              <ProtectedRoute>
                <ProjectList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dpr/:projectId"
            element={
              <ProtectedRoute>
                <DPRForm />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
