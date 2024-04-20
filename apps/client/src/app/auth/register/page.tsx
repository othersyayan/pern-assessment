import type { Metadata } from "next";
import AuthRegisterView from "@/sections/auth-register-view";

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Register - PERN Assessment",
};

export default function RegisterPage() {
  return <AuthRegisterView />;
}
