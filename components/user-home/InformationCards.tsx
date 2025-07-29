"use client";

import { BookOpen, Clock, TrendingUp, AlertTriangle } from "lucide-react";
import InformationCard from "./InformationCard";

// Dummy data untuk information cards
const informationData = [
  {
    title: "Sedang Dipinjam",
    value: 2,
    subtitle: "buku aktif",
    icon: BookOpen,
    iconColor: "text-violet-600"
  },
  {
    title: "Harus Dikembalikan",
    value: 1,
    subtitle: "dalam 7 hari",
    icon: Clock,
    iconColor: "text-orange-600"
  },
  {
    title: "Total Dipinjam",
    value: 24,
    subtitle: "bulan ini",
    icon: TrendingUp,
    iconColor: "text-green-600"
  },
  {
    title: "Denda",
    value: "Rp 0",
    subtitle: "belum ada denda",
    icon: AlertTriangle,
    iconColor: "text-red-600"
  }
];

export default function InformationCards() {
  const handleCardClick = (title: string) => {
    // TODO: Implement modal untuk menampilkan detail data
    console.log(`Clicked on ${title} card`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {informationData.map((data, index) => (
        <InformationCard
          key={index}
          title={data.title}
          value={data.value}
          subtitle={data.subtitle}
          icon={data.icon}
          iconColor={data.iconColor}
          onClick={() => handleCardClick(data.title)}
        />
      ))}
    </div>
  );
}