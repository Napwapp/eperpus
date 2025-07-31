"use client";

import Header from "@/components/admin/Header";
import { useRouter, useSearchParams } from "next/navigation";
import BaseAlert from "@/components/ui/base-alert";
import { useEffect, useState } from "react";
import { Cards } from "@/components/admin/dashboard/cards";
import { PinjamanTelat } from "@/components/admin/dashboard/pinjaman-telat";
import { PinjamanTerakhir } from "@/components/admin/dashboard/pinjaman-terakhir";

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

      <div className="p-6 space-y-6 bg-white min-h-screen">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Dashboard Admin
          </h1>

          {/* Data Utama Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Data utama
            </h2>
            <Cards />
          </div>

          {/* Pinjaman Section */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3">
              <PinjamanTerakhir />
            </div>
            <div className="lg:col-span-2">
              <PinjamanTelat />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
