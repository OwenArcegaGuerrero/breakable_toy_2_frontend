import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TrackPageSliceProps } from "../../interfaces/TrackPageSliceProps";

const initialState: TrackPageSliceProps = {
  details: {},
  position: 0,
};

const trackDetailsSlice = createSlice({
  name: "trackDetails",
  initialState,
  reducers: {
    setPosition: (state, action: PayloadAction<number>) => {
      state.position = action.payload;
    },
    clearTrackDetails: (state) => {
      state.details = {};
      state.position = 0;
    },
  },
  extraReducers(builder) {
    builder.addCase(getTrackDetails.fulfilled, (state, action) => {
      state.details = action.payload;
    });
  },
});

export const getTrackDetails = createAsyncThunk(
  "trackDetails/getTrackDetails",
  async (id: string) => {
    const data = await fetch(`http://localhost:8080/tracks/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => data);
    return data;
  }
);

export const { clearTrackDetails, setPosition } = trackDetailsSlice.actions;
export default trackDetailsSlice.reducer;
