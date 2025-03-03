import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { albumDetailsSliceProps } from "../../interfaces/albumDetailsSliceProps";

const initialState: albumDetailsSliceProps = {
  details: undefined,
};

const albumDetailsSlice = createSlice({
  name: "albumDetails",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAlbumDetails.fulfilled, (state, action) => {
      state.details = action.payload;
    });
  },
});

export const getAlbumDetails = createAsyncThunk(
  "albumDetails/getAlbumDetails",
  async (id: string) => {
    const data = await fetch("http://localhost:8080/albums/" + id)
      .then((res) => res.json())
      .then((data) => data);
    return data;
  }
);

export const {} = albumDetailsSlice.actions;
export default albumDetailsSlice.reducer;
