"use client";

import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Profil</h1>
      <p>Nama: {session?.user?.name || "Tidak tersedia"}</p>
      <p>Email: {session?.user?.email || "Tidak tersedia"}</p>
      <p>Nomor HP: {session?.user?.nomorHp || "Tidak tersedia"}</p>
      <p>Alamat: {session?.user?.alamat || "Tidak tersedia"}</p>
      <p>
        Jenis Kelamin:{" "}
        {session?.user?.gender
          ? session.user.gender === "laki_laki"
            ? "Laki-laki"
            : session.user.gender === "perempuan"
            ? "Perempuan"
            : session.user.gender
          : "Tidak tersedia"}
      </p>
    </>
  );
}
