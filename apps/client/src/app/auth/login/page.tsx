import type { Metadata } from "next";
import AuthLoginView from "@/sections/auth-login-view";

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Login - PERN Assessment",
};

export default function LoginPage() {
  return <AuthLoginView />;
}
