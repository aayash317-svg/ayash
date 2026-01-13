
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import type { UserRole } from './context/AuthContext';
import Landing from './pages/Landing';
import StudentLogin from './pages/auth/StudentLogin';
import StaffLogin from './pages/auth/StaffLogin';
import StudentDashboard from './pages/student/Dashboard';
import DegreeAudit from './pages/student/DegreeAudit';
import ScheduleOptimization from './pages/student/ScheduleOptimization';
import Chat from './pages/student/Chat';
import StaffDashboard from './pages/staff/Dashboard';
import DataEntry from './pages/staff/DataEntry';
import SubmissionReview from './pages/staff/SubmissionReview';
import MainLayout from './layouts/MainLayout';

const ProtectedRoute = ({ allowedRole }: { allowedRole: UserRole }) => {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated) return <Navigate to="/" />;
  if (userRole !== allowedRole) return <Navigate to="/" />;

  return <Outlet />;
};

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/login/student" element={<StudentLogin />} />
        <Route path="/login/staff" element={<StaffLogin />} />

        <Route element={<ProtectedRoute allowedRole="student" />}>
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/audit" element={<DegreeAudit />} />
          <Route path="/student/schedule" element={<ScheduleOptimization />} />
          <Route path="/student/chat" element={<Chat />} />
        </Route>

        <Route element={<ProtectedRoute allowedRole="staff" />}>
          <Route path="/staff/dashboard" element={<StaffDashboard />} />
          <Route path="/staff/data-entry" element={<DataEntry />} />
          <Route path="/staff/review" element={<SubmissionReview />} />
        </Route>
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
