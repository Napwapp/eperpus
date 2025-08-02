import { PrismaClient } from '../lib/generated/prisma';

const prisma = new PrismaClient();

async function main() {    
  const booksData = [
    {
      title: "Sapiens: A Brief History of Humankind",
      author: "Yuval Noah Harari",
      cover: "/file.svg",
      sinopsis: "Sapiens adalah buku yang menceritakan sejarah umat manusia dari zaman purba hingga era modern. Buku ini mengulas bagaimana Homo sapiens berhasil mendominasi planet Bumi dan membentuk peradaban seperti yang kita kenal sekarang.",
      publisher: "Harper",
      release_date: new Date("2011-01-01"),
      rak: "A-01",
      lokasi: "Rak Sejarah",
      stok: 5,
      categories: ["Sejarah", "Non-Fiksi", "Antropologi"]
    },
    {
      title: "Filosofi Teras",
      author: "Henry Manampiring",
      cover: "/file.svg",
      sinopsis: "Filosofi Teras mengajarkan kita tentang stoisisme, filosofi Yunani kuno yang membantu kita menghadapi tantangan hidup dengan tenang dan bijak. Buku ini mengadaptasi ajaran stoisisme untuk konteks Indonesia modern.",
      publisher: "Kompas",
      release_date: new Date("2019-01-01"),
      rak: "B-01",
      lokasi: "Rak Filsafat",
      stok: 3,
      categories: ["Filsafat", "Self-Help", "Psikologi"]
    },
    {
      title: "Rich Dad Poor Dad",
      author: "Robert T. Kiyosaki",
      cover: "/file.svg",
      sinopsis: "Buku klasik tentang literasi keuangan yang mengajarkan perbedaan mindset antara orang kaya dan orang miskin. Kiyosaki membagikan pelajaran berharga dari dua ayah yang memiliki pandangan berbeda tentang uang dan investasi.",
      publisher: "Warner Books",
      release_date: new Date("1997-01-01"),
      rak: "C-01",
      lokasi: "Rak Bisnis",
      stok: 4,
      categories: ["Bisnis", "Keuangan", "Investasi"]
    },
    {
      title: "The Lean Startup",
      author: "Eric Ries",
      cover: "/file.svg",
      sinopsis: "Metodologi lean startup yang mengajarkan cara membangun startup yang sukses dengan pendekatan yang lebih efisien dan berbasis data. Buku ini menjadi panduan wajib bagi para entrepreneur modern.",
      publisher: "Crown Business",
      release_date: new Date("2011-09-13"),
      rak: "C-02",
      lokasi: "Rak Bisnis",
      stok: 6,
      categories: ["Bisnis", "Startup", "Inovasi"]
    },
    {
      title: "Negeri 5 Menara",
      author: "Ahmad Fuadi",
      cover: "/file.svg",
      sinopsis: "Novel inspiratif yang menceritakan perjalanan Alif, seorang santri dari Minang yang belajar di Pondok Madani. Buku ini mengajarkan tentang persahabatan, perjuangan, dan mimpi untuk meraih kesuksesan.",
      publisher: "Gramedia Pustaka Utama",
      release_date: new Date("2009-01-01"),
      rak: "D-01",
      lokasi: "Rak Novel",
      stok: 8,
      categories: ["Novel", "Inspirasi", "Pendidikan"]
    }
  ];

  // Insert buku dan kategori
  for (const bookData of booksData) {
    const { categories, ...bookInfo } = bookData;
    
    const book = await prisma.buku.create({
      data: bookInfo,
    });

    // Insert kategori untuk setiap buku
    for (const categoryName of categories) {
      await prisma.kategori.create({
        data: {
          books_id: book.id,
          kategori: categoryName,
        },
      });
    }
  }
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 