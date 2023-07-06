import { env } from '@/env.mjs';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './slices';

export const store = configureStore({
  reducer: rootReducer,
  devTools: env.NEXT_PUBLIC_NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch