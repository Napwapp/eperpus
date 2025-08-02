import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Buku } from '@/lib/types/buku';

interface BooksState {
  books: Buku[];
  countBooks: number;
  loading: boolean;
  error: string | null;
  currentBook: Buku | null;
}

const initialState: BooksState = {
  books: [],
  countBooks: 0,
  loading: false,
  error: null,
  currentBook: null,
};

// Async thunk untuk mengambil semua buku
export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async () => {
    const response = await fetch('/api/books');
    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }
    const data = await response.json();
    return data.books;
  }
);

// Async thunk untuk menambah buku
export const addBook = createAsyncThunk(
  'books/addBook',
  async (bookData: Omit<Buku, 'id' | 'createdAt' | 'updatedAt' | 'categories'> & { categories: string[] }) => {
    const response = await fetch('/api/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to add book');
    }
    
    const data = await response.json();
    return data.book;
  }
);

// Async thunk untuk mengambil buku berdasarkan ID
export const fetchBookById = createAsyncThunk(
  'books/fetchBookById',
  async (id: string) => {
    const response = await fetch(`/api/books/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch book');
    }
    const data = await response.json();
    return data.book;
  }
);

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentBook: (state, action: PayloadAction<Buku | null>) => {
      state.currentBook = action.payload;
    },
    updateBookStock: (state, action: PayloadAction<{ id: number; stok: number }>) => {
      const book = state.books.find(b => b.id === action.payload.id);
      if (book) {
        book.stok = action.payload.stok;
      }
    },
  },
  extraReducers: (builder) => {
    // Fetch books
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
        state.countBooks = action.payload.length;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch books';
      });

    // Add book
    builder
      .addCase(addBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.loading = false;
        state.books.unshift(action.payload); // Add to beginning
        state.countBooks = state.books.length;
      })
      .addCase(addBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add book';
      });

    // Fetch book by ID
    builder
      .addCase(fetchBookById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBook = action.payload;
      })
      .addCase(fetchBookById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch book';
      });
  },
});

export const { clearError, setCurrentBook, updateBookStock } = booksSlice.actions;
export default booksSlice.reducer; 