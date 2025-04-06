import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import themeReducer from './slices/themeToggle/themeSlice'
import tableReducer from './slices/table/tableSlice'

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = {
  theme: persistReducer(persistConfig, themeReducer),
  table: persistReducer(persistConfig, tableReducer),
};
export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch