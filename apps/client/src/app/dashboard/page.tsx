import type { Metadata } from "next";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import DashboardView from "@/sections/dashboard-view";

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("token");

  if (!accessToken) {
    redirect("/auth/login");
  }

  return <DashboardView />;
}
