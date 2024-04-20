"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { deleteCookie } from "@/app/actions";

// ----------------------------------------------------------------------

export default function DashboardView() {
  const router = useRouter();
  const handleLogout = useCallback(async () => {
    await deleteCookie("token");

    localStorage.removeItem("token");

    router.push("/");
  }, [router]);

  return (
    <>
      <h3 className="text-xl font-bold mb-6">Welcome Member!</h3>
      <p className="text-sm font-light text-justify mb-8">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique
        ducimus natus saepe cumque alias, impedit ullam ipsum quasi atque,
        nesciunt rem, reiciendis fugit molestias dignissimos illo aperiam?
        Maiores laborum ut atque quis ea similique voluptates cumque voluptatem
        doloremque omnis eius, molestias beatae tempora, unde aperiam rem eaque,
        autem error mollitia!
      </p>
      <button
        onClick={handleLogout}
        className="border border-red-600/50 hover:border-red-600 hover:bg-red-600/10 py-2 px-4 rounded-lg text-sm text-red-600 w-full transition ease-out"
      >
        Logout
      </button>
    </>
  );
}
