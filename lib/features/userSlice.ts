import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

interface UserState {
  users: User[];
  countUserOnly: number;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  countUserOnly: 0,
  loading: false,
  error: null,
};

// Async thunk
export const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const res = await fetch("/api/user");
  if (!res.ok) throw new Error("Gagal mengambil data users");
  const data = await res.json();
  return data.users as User[];
});

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.countUserOnly = action.payload.filter(user => user.role === "user").length;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error tidak diketahui";
      });
  },
});

export default userSlice.reducer;
