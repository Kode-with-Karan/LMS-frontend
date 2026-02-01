import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import CoursesPage from './pages/CoursesPage'
import CourseDetailPage from './pages/CourseDetailPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import TeachPage from './pages/TeachPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import DashboardPage from './pages/DashboardPage'
import ProtectedRoute from './components/ProtectedRoute'
import MyCourses from './pages/MyCourses'
import CourseLearning from './pages/CourseLearning'
import Wishlist from './pages/Wishlist'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import PurchaseHistory from './pages/PurchaseHistory'
import Certificates from './pages/Certificates'
import Notifications from './pages/Notifications'
import InstructorDashboard from './pages/InstructorDashboard'
import CreateCourse from './pages/CreateCourse'
import ManageCourses from './pages/ManageCourses'
import EditCourse from './pages/EditCourse'
import AddSectionsLectures from './pages/AddSectionsLectures'
import InstructorEarnings from './pages/InstructorEarnings'
import StudentsEnrolled from './pages/StudentsEnrolled'
import InstructorProfile from './pages/InstructorProfile'
import WithdrawalRequest from './pages/WithdrawalRequest'
import AdminDashboard from './pages/AdminDashboard'
import UserManagement from './pages/UserManagement'
import InstructorApproval from './pages/InstructorApproval'
import CourseManagement from './pages/CourseManagement'
import Reports from './pages/Reports'
import PlatformAnalytics from './pages/PlatformAnalytics'
import PaymentsTransactions from './pages/PaymentsTransactions'
import CategoryManagement from './pages/CategoryManagement'
import SiteSettings from './pages/SiteSettings'
import CheckoutPage from './pages/CheckoutPage'
import PaymentSuccessPage from './pages/PaymentSuccessPage'
import PaymentCancelPage from './pages/PaymentCancelPage'

export default function App(){
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/courses" element={<CoursesPage/>} />
      <Route path="/course/:slug" element={<CourseDetailPage/>} />
      <Route path="/about" element={<AboutPage/>} />
      <Route path="/contact" element={<ContactPage/>} />
      <Route path="/teach" element={<TeachPage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/register" element={<RegisterPage/>} />
      <Route path="/forgot-password" element={<ForgotPasswordPage/>} />
      <Route path="/reset-password/:token" element={<ResetPasswordPage/>} />
      <Route path="/checkout/:slug" element={<ProtectedRoute><CheckoutPage/></ProtectedRoute>} />
      <Route path="/payment/success/:orderId" element={<ProtectedRoute><PaymentSuccessPage/></ProtectedRoute>} />
      <Route path="/payment/cancel" element={<ProtectedRoute><PaymentCancelPage/></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><DashboardPage/></ProtectedRoute>} />
      <Route path="/purchase-history" element={<ProtectedRoute><PurchaseHistory/></ProtectedRoute>} />
      <Route path="/certificates" element={<ProtectedRoute><Certificates/></ProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute><Notifications/></ProtectedRoute>} />
      <Route path="/wishlist" element={<ProtectedRoute><Wishlist/></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} />
      <Route path="/profile/edit" element={<ProtectedRoute><EditProfile/></ProtectedRoute>} />
      <Route path="/my-courses" element={<ProtectedRoute><MyCourses/></ProtectedRoute>} />
      <Route path="/course/:courseId/learning" element={<ProtectedRoute><CourseLearning/></ProtectedRoute>} />

      <Route path="/instructor/dashboard" element={<ProtectedRoute allowedRoles={["instructor"]} redirectTo="/login"><InstructorDashboard/></ProtectedRoute>} />
      <Route path="/instructor/create-course" element={<ProtectedRoute allowedRoles={["instructor"]} redirectTo="/login"><CreateCourse/></ProtectedRoute>} />
      <Route path="/instructor/manage-courses" element={<ProtectedRoute allowedRoles={["instructor"]} redirectTo="/login"><ManageCourses/></ProtectedRoute>} />
      <Route path="/instructor/edit-course/:id" element={<ProtectedRoute allowedRoles={["instructor"]} redirectTo="/login"><EditCourse/></ProtectedRoute>} />
      <Route path="/instructor/sections" element={<ProtectedRoute allowedRoles={["instructor"]} redirectTo="/login"><AddSectionsLectures/></ProtectedRoute>} />
      <Route path="/instructor/earnings" element={<ProtectedRoute allowedRoles={["instructor"]} redirectTo="/login"><InstructorEarnings/></ProtectedRoute>} />
      <Route path="/instructor/students" element={<ProtectedRoute allowedRoles={["instructor"]} redirectTo="/login"><StudentsEnrolled/></ProtectedRoute>} />
      <Route path="/instructor/profile" element={<ProtectedRoute allowedRoles={["instructor"]} redirectTo="/login"><InstructorProfile/></ProtectedRoute>} />
      <Route path="/instructor/withdrawals" element={<ProtectedRoute allowedRoles={["instructor"]} redirectTo="/login"><WithdrawalRequest/></ProtectedRoute>} />

      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={["admin"]} redirectTo="/login"><AdminDashboard/></ProtectedRoute>} />
      <Route path="/admin/users" element={<ProtectedRoute allowedRoles={["admin"]} redirectTo="/login"><UserManagement/></ProtectedRoute>} />
      <Route path="/admin/instructor-approvals" element={<ProtectedRoute allowedRoles={["admin"]} redirectTo="/login"><InstructorApproval/></ProtectedRoute>} />
      <Route path="/admin/courses" element={<ProtectedRoute allowedRoles={["admin"]} redirectTo="/login"><CourseManagement/></ProtectedRoute>} />
      <Route path="/admin/reports" element={<ProtectedRoute allowedRoles={["admin"]} redirectTo="/login"><Reports/></ProtectedRoute>} />
      <Route path="/admin/analytics" element={<ProtectedRoute allowedRoles={["admin"]} redirectTo="/login"><PlatformAnalytics/></ProtectedRoute>} />
      <Route path="/admin/transactions" element={<ProtectedRoute allowedRoles={["admin"]} redirectTo="/login"><PaymentsTransactions/></ProtectedRoute>} />
      <Route path="/admin/categories" element={<ProtectedRoute allowedRoles={["admin"]} redirectTo="/login"><CategoryManagement/></ProtectedRoute>} />
      <Route path="/admin/site-settings" element={<ProtectedRoute allowedRoles={["admin"]} redirectTo="/login"><SiteSettings/></ProtectedRoute>} />
    </Routes>
  )
}
