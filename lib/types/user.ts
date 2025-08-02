import { Role, Gender } from "@/lib/generated/prisma";

// Interface data user dasar
export interface UserData {
  id: string;
  name: string;
  email: string;
  nomorHp?: string;
  alamat?: string;
  gender?: Gender;
  role: Role;
  createdAt: string;
  updatedAt: string;
  verified_at?: string;
}

// Data user khusus untuk komponen profile
export interface ProfileUserData {
  id: string;
  name: string;
  email: string;
  nomorHp?: string;
  alamat?: string;
  gender?: string;
  role: string;
  createdAt: string;
  verified_at?: string;
}

// Props untuk komponen Header
export interface HeaderProps {
  user?: {
    name: string;
    email: string;
  };
}

// Props untuk komponen ProfileContent
export interface ProfileContentProps {
  user: ProfileUserData;
}

// Props untuk komponen EditProfileSheet
export interface EditProfileSheetProps {
  user: ProfileUserData;
}

// Props untuk komponen Profile utama
export interface ProfileProps {
  user: ProfileUserData;
}

// Tipe response API yang aman untuk TypeScript
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  error?: string;
  data?: T;
  user?: T;
}

// Tipe request untuk update profile
export interface UpdateProfileRequest {
  id: string;
  name: string;
  email: string;
  nomorHp: string;
  alamat: string;
  gender: string;
}

// Fungsi untuk mendapatkan label gender
export const getGenderLabel = (gender?: string): string => {
  switch (gender) {
    case 'laki_laki':
      return 'Laki-laki';
    case 'perempuan':
      return 'Perempuan';
    case 'tidak_memilih':
      return 'Tidak memilih';
    default:
      return 'Tidak memilih';
  }
};

// Fungsi untuk mendapatkan label role
export const getRoleLabel = (role: string): string => {
  switch (role) {
    case 'user':
      return 'Pengguna';
    case 'admin':
      return 'Admin';
    case 'superadmin':
      return 'Super Admin';
    default:
      return 'Pengguna';
  }
};

// Fungsi untuk format tanggal
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Fungsi untuk mendapatkan inisial user untuk avatar
export const getUserInitials = (name: string): string => {
  return name.charAt(0).toUpperCase();
}; 