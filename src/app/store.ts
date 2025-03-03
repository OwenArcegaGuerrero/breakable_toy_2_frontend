import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./search/searchSlice";
import topArtistsReducer from "./topArtists/topArtistsSlice";
import artistDetailsReducer from "./artistDetails/artistDetailsSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    topArtists: topArtistsReducer,
    artistDetails: artistDetailsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
