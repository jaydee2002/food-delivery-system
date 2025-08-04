import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import OTPVerification from "./pages/OTPVerification";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
import AuthCallback from "./pages/AuthCallback";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { token, user } = useContext(AuthContext);
  if (!token) return <Navigate to="/signin" />;
  if (
    requiredRole &&
    !user?.roles?.some((role) => role.name === requiredRole)
  ) {
    return <Navigate to="/dashboard" />;
  }
  return children;
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verify-otp" element={<OTPVerification />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="Super Admin">
                <AdminPanel />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/signin" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
