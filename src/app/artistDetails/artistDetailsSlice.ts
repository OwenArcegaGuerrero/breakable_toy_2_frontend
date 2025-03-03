import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { artistDetailsSliceProps } from "../../interfaces/artistDetailsSliceProps";

const initialState: artistDetailsSliceProps = {
  details: {},
};

const artistDetailsSlice = createSlice({
  name: "artistDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getArtistDetails.fulfilled, (state, action) => {
      state.details = action.payload;
    });
  },
});

export const getArtistDetails = createAsyncThunk(
  "artistDetails/getArtistDetails",
  async (id: string) => {
    const data = await fetch("http://localhost:8080/artists/" + id, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => data);
    return data;
  }
);

export const {} = artistDetailsSlice.actions;
export default artistDetailsSlice.reducer;
