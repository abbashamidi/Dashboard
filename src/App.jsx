import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./LoginForm";
import Dashboard from "./Dashboard";
import ProtectedRoute from "./ProtectedRoute"; // 👈 حتما اینو ایمپورت کن

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />

        {/* ✅ پیچیدن مسیر محافظت‌شده داخل ProtectedRoute */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
