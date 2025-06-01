import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import InstructorDashboard from './pages/instructor/Dashboard';
import StudentDashboard from './pages/student/Dashboard';
import ProtectedRoute from './utils/ProtectedRoute';
import CourseList from './pages/instructor/CourseList';
import CourseForm from './pages/instructor/CourseForm';
import StudentCourseList from './pages/student/CourseList';
import StudentCourseDetail from './pages/student/CourseDetail';
import QuizPage from './pages/student/QuizPage';
import AssessmentList from './pages/instructor/AssessmentList';
import SubmissionsView from './pages/instructor/SubmissionsView';
import AssessmentForm from './pages/instructor/AssessmentForm';
import StudentResults from './pages/student/Results';
import SubmissionDetail from './pages/instructor/SubmissionDetail';
import { ThemeProvider } from './ThemeContext';
//import ThemeControls from './ThemeControls';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Navbar />

        <Routes>
          {/* Root redirect */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Instructor */}
          <Route path="/instructor/dashboard" element={<ProtectedRoute roleRequired="Instructor"><InstructorDashboard /></ProtectedRoute>} />
          <Route path="/instructor/courses" element={<ProtectedRoute roleRequired="Instructor"><CourseList /></ProtectedRoute>} />
          <Route path="/instructor/courses/new" element={<ProtectedRoute roleRequired="Instructor"><CourseForm /></ProtectedRoute>} />
          <Route path="/instructor/courses/edit/:courseId" element={<ProtectedRoute roleRequired="Instructor"><CourseForm /></ProtectedRoute>} />
          <Route path="/instructor/assessments" element={<ProtectedRoute roleRequired="Instructor"><AssessmentList /></ProtectedRoute>} />
          <Route path="/instructor/assessments/new" element={<ProtectedRoute roleRequired="Instructor"><AssessmentForm /></ProtectedRoute>} />
          <Route path="/instructor/assessments/:assessmentId/submissions" element={<ProtectedRoute roleRequired="Instructor"><SubmissionsView /></ProtectedRoute>} />
          <Route path="/instructor/results/:resultId" element={<ProtectedRoute roleRequired="Instructor"><SubmissionDetail /></ProtectedRoute>} />

          {/* Student */}
          <Route path="/student/dashboard" element={<ProtectedRoute roleRequired="Student"><StudentDashboard /></ProtectedRoute>} />
          <Route path="/student/courses" element={<ProtectedRoute roleRequired="Student"><StudentCourseList /></ProtectedRoute>} />
          <Route path="/student/course/:courseId" element={<ProtectedRoute roleRequired="Student"><StudentCourseDetail /></ProtectedRoute>} />
          <Route path="/student/quiz/:assessmentId" element={<ProtectedRoute roleRequired="Student"><QuizPage /></ProtectedRoute>} />
          <Route path="/student/results" element={<ProtectedRoute roleRequired="Student"><StudentResults /></ProtectedRoute>} />
        </Routes>
      </Router >
    </ThemeProvider>
  );
}

export default App;