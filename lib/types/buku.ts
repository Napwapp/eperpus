export interface Kategori {
    id: number;
    books_id: number;
    kategori: string;
    createdAt: string; // ISO date string
    updatedAt: string;
  }
  
  export interface Buku {
    id: number;
    cover?: string | null;
    title: string;
    sinopsis: string;
    author: string;
    publisher?: string | null;
    release_date?: string | null; // ISO date string
    rak?: string | null;
    lokasi: string;
    stok: number;
    categories: Kategori[];
    createdAt: string;
    updatedAt: string;
  }
  