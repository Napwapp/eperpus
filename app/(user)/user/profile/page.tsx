"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Header from "@/components/user-home/Header";
import Profile from "@/components/profile/Profile";
import { showAlert } from "@/components/ui/toast";
import { ProfileUserData } from "@/lib/types/user";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<ProfileUserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user?.email) {
        try {
          const response = await fetch(`/api/user/profile?email=${session.user.email}`);
          const data = await response.json();
          
          if (data.success) {
            setUserData(data.user);
          } else {
            showAlert({ message: "Gagal memuat data profil", type: "error" });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          showAlert({ message: "Terjadi kesalahan saat memuat data profil", type: "error" });
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchUserData();
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [session, status]);

  if (status === "loading" || loading) {
    return (
      <div className="w-full overflow-hidden">
        <Header />
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Memuat data profil...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!userData) {
    return (
      <div className="w-full overflow-hidden">
        <Header />
        <div className="p-4 sm:p-6">
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl font-bold mb-4">Data Tidak Ditemukan</h1>
            <p className="text-gray-600">Tidak dapat memuat data profil.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden">
      <Header />
      <div className="p-4 sm:p-6">
        <Profile user={userData} />
      </div>
    </div>
  );
}
