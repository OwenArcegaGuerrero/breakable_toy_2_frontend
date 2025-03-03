import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TopArtistsSliceProps } from "../../interfaces/topArtistsSliceProps";

const initialState: TopArtistsSliceProps = {
  artists: {},
};

const topArtistsSlice = createSlice({
  name: "topArtists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTopArtists.fulfilled, (state, action) => {
      state.artists = action.payload;
    });
  },
});

export const getTopArtists = createAsyncThunk(
  "topArtists/getTopArtists",
  async () => {
    const data = await fetch("http://localhost:8080/me/top/artists", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => data);
    return data;
  }
);

export const {} = topArtistsSlice.actions;
export default topArtistsSlice.reducer;
