import { configureStore } from '@reduxjs/toolkit';
import philosophyReducer from './slices/philosophySlice';

const store = configureStore({
  reducer: {
    philosophy: philosophyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;