import { Home, BookOpen, User, LayoutDashboard, Book } from "lucide-react";

export const UserLinks = [
  {
    title: "Beranda",
    url: "/user/home",
    icon: Home,
  },  
  {
    title: "Pinjaman",
    url: "/user/pinjaman",
    icon: BookOpen,
  },
];

export const baseLinks = [
  {
    title: "Profil",
    url: "/user/profile",
    icon: User,
  },
  {
    title: "Buku",
    url: "/user/books",
    icon: BookOpen,
  },
];

export const AdminLinks = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Data buku",
    url: "/admin/data/buku",
    icon: Book,
  },
  {
    title: "Data pinjaman",
    url: "/admin/data-pinjaman",
    icon: Book,
  },
];