import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice'; 
import dashboardReducer from '../features/dashboardSlice';

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
