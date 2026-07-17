import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Teachers from "./pages/Teachers";
import Attendance from "./pages/Attendance";
import Marks from "./pages/Marks";
import Courses from "./pages/Courses";
import Login from "./pages/Login";
import { isAuthenticated } from "./services/authService";

function ProtectedRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/" replace />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
      />
      <Route
        path="/students"
        element={<ProtectedRoute><Students /></ProtectedRoute>}
      />
      <Route
        path="/teachers"
        element={<ProtectedRoute><Teachers /></ProtectedRoute>}
      />
      <Route
        path="/attendance"
        element={<ProtectedRoute><Attendance /></ProtectedRoute>}
      />
      <Route
        path="/marks"
        element={<ProtectedRoute><Marks /></ProtectedRoute>}
      />
      <Route
        path="/courses"
        element={<ProtectedRoute><Courses /></ProtectedRoute>}
      />
    </Routes>
  );
}

export default App;