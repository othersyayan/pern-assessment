import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Home() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("token");

  if (!accessToken) {
    redirect("/auth/login");
  } else {
    redirect("/dashboard");
  }
}
