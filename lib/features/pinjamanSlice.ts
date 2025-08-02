import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Pinjaman } from "@/lib/types/pinjaman";

export interface PinjamanState {
  pinjaman: Pinjaman[];
  loading: boolean;
  error: string | null;
}

const initialState: PinjamanState = {
  pinjaman: [],
  loading: false,
  error: null,
};

export const fetchPinjamanUser = createAsyncThunk(
  "pinjaman/fetchUser",
  async () => {
    const res = await fetch('/api/user/pinjaman');
    if (!res.ok) throw new Error("Gagal mengambil data pinjaman");
    return await res.json();
  }
);

const pinjamanSlice = createSlice({
  name: "pinjaman",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPinjamanUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPinjamanUser.fulfilled, (state, action: PayloadAction<Pinjaman[]>) => {
        state.loading = false;
        state.pinjaman = action.payload;
      })
      .addCase(fetchPinjamanUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Gagal mengambil data pinjaman";
      });
  }
});

export default pinjamanSlice.reducer;
