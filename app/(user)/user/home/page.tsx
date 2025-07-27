"use client";

import { Suspense, useEffect } from "react";
import { showAlert } from "@/components/ui/toast";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomePage() {
  const { data: session } = useSession();

  useEffect(() => {
    const successMessage = localStorage.getItem("successMessage");
    if (successMessage) {
      showAlert({ message: successMessage, type: "success" });
      localStorage.removeItem("successMessage");
    }
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Home</h1>
      <Suspense fallback={<Skeleton className="w-full h-10 rounded-md mt-4 mb-4 bg-gray-200 animate-pulse" />}>
        <p>Selamat datang, {session?.user?.name}</p>
        <p>Email: {session?.user?.email}</p>        
      </Suspense>
    </>
  );
}
