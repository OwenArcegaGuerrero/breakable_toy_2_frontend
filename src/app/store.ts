import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./search/searchSlice";
import topArtistsReducer from "./topArtists/topArtistsSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    topArtists: topArtistsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
