import { configureStore } from '@reduxjs/toolkit'
import booksReducer from './features/booksSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      books: booksReducer,
    }
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']