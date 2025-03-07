import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./search/searchSlice";
import topArtistsReducer from "./topArtists/topArtistsSlice";
import artistDetailsReducer from "./artistDetails/artistDetailsSlice";
import albumDetailsReducer from "./albumDetails/albumDetailsSlice";
import trackDetailsReducer from "./trackDetails/trackDetailsSlice";
import playlistDetailsReducer from "./playlistDetails/playlistDetailsSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    topArtists: topArtistsReducer,
    artistDetails: artistDetailsReducer,
    albumDetails: albumDetailsReducer,
    trackDetails: trackDetailsReducer,
    playlistDetails: playlistDetailsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
