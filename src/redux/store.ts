import { configureStore, combineReducers } from "@reduxjs/toolkit"
import filter from "./slices/filterSlice"
import cart from "./slices/cartSlice"
import pizza from "./slices/pizzaSlice"
import { useDispatch } from "react-redux"
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "reduxjs-toolkit-persist"
import storage from "reduxjs-toolkit-persist/lib/storage"

const rootReducer = combineReducers({ filter, cart, pizza })

const persistConfig = {
  key: "root",
  storage,
}

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
) as typeof rootReducer

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export default store
