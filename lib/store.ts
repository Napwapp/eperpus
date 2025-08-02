import { configureStore } from '@reduxjs/toolkit'
import booksReducer from './features/booksSlice'
import usersReducer from './features/userSlice'
import pinjamanReducer from './features/pinjamanSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      books: booksReducer,
      users: usersReducer,
      pinjaman: pinjamanReducer,
    }
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']