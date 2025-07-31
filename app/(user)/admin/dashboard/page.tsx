"use client";

import Header from "@/components/admin/Header";
import { useRouter, useSearchParams } from "next/navigation";
import BaseAlert from "@/components/ui/base-alert";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [baseAlert, setBaseAlert] = useState(false);

  useEffect(() => {
    const unauthorized = searchParams.get("unauthorized");

    if (unauthorized === "true") {
      setBaseAlert(true);
      router.replace("/admin/dashboard", { scroll: false });
    }
  }, [searchParams, router]);
  
  return (
    <>
      <Header />
      {baseAlert && (
        <BaseAlert
          type="error"
          message="Maaf, kamu tidak memiliki akses untuk mengakses halaman tersebut"
          autoClose
          onClose={() => setBaseAlert(false)}
        />
      )}

      <div className="flex flex-col gap-4">
        <h1>Admin Dashboard</h1>
      </div>
    </>
  );
}
