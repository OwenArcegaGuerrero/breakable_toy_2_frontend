import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { playlistDetailsSliceProps } from "../../interfaces/PlaylistDetailsSliceProps";

const initialState: playlistDetailsSliceProps = {
  details: undefined,
};

const playlistDetailsSlice = createSlice({
  name: "playlistDetails",
  initialState,
  reducers: {
    clearPlaylistDetails: (state) => {
      state.details = undefined;
    },
  },
  extraReducers(builder) {
    builder.addCase(getPlaylistDetails.fulfilled, (state, action) => {
      state.details = action.payload;
      console.log(state.details);
    });
  },
});

export const getPlaylistDetails = createAsyncThunk(
  "playlistDetails/getPlaylistDetails",
  async (id: string) => {
    const data = await fetch("http://localhost:8080/playlists/" + id)
      .then((res) => res.json())
      .then((data) => data);
    return data;
  }
);

export const { clearPlaylistDetails } = playlistDetailsSlice.actions;
export default playlistDetailsSlice.reducer;
