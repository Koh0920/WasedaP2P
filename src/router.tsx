import { createBrowserRouter, Navigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { BrowsePage } from "@/pages/BrowsePage";
import { NoteDetailPage } from "@/pages/NoteDetailPage";
import { UploadPage } from "@/pages/UploadPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { ForumPage } from "@/pages/ForumPage";
import { LoginPage } from "@/pages/auth/LoginPage";
import { SignupPage } from "@/pages/auth/SignupPage";
import { EmailVerificationPage } from "@/pages/auth/EmailVerificationPage";
import { PasswordResetPage } from "@/pages/auth/PasswordResetPage";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <Navigate to="/browse" replace /> },
      { path: "/browse", element: <BrowsePage /> },
      { path: "/notes/:id", element: <NoteDetailPage /> },
      { path: "/upload", element: <UploadPage /> },
      { path: "/profile/:username", element: <ProfilePage /> },
      { path: "/forum", element: <ForumPage /> },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignupPage /> },
      { path: "/verify-email", element: <EmailVerificationPage /> },
      { path: "/reset-password", element: <PasswordResetPage /> },
    ],
  },
]);
