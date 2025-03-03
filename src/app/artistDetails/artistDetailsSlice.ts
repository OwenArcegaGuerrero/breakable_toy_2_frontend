import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface artistDetails {
  artistId?: string;
  details: {
    artistDetails?: {
      name?: string;
      images?: [
        {
          url: string;
        }
      ];
    };
    artistTopTracks?: {};
    artistAlbums?: {
      items?: Array<{
        images?: Array<{ url?: string }>;
        name?: string;
        release_date?: string;
        id?: string;
      }>;
    };
  };
}

const initialState: artistDetails = {
  artistId: "",
  details: {},
};

const artistDetailsSlice = createSlice({
  name: "artistDetails",
  initialState,
  reducers: {
    setArtistId: (state, action: PayloadAction<string>) => {
      state.artistId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getArtistDetails.fulfilled, (state, action) => {
      state.details = action.payload;
    });
  },
});

export const getArtistDetails = createAsyncThunk(
  "artistDetails/getArtistDetails",
  async (_, { getState }) => {
    const state = getState() as { artistDetails: artistDetails };
    const artistId = state.artistDetails.artistId;
    const data = await fetch("http://localhost:8080/artists/" + artistId, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => data);
    return data;
  }
);

export const { setArtistId } = artistDetailsSlice.actions;
export default artistDetailsSlice.reducer;
