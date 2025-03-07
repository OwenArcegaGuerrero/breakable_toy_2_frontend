import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { search } from "../../interfaces/SearchSliceProps";

const initialState: search = {
  searchValue: "",
  searchResults: {},
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    clearSearch: (state) => {
      state.searchResults = {};
      state.searchValue = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSearchResult.fulfilled, (state, action) => {
      state.searchResults = action.payload;
    });
  },
});

export const getSearchResult = createAsyncThunk(
  "search/getSearchResult",
  async (_, { getState }) => {
    const state = getState() as { search: search };
    const params = "?query=" + state.search.searchValue;
    const data = await fetch("http://localhost:8080/search" + params, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => data);
    return data;
  }
);

export const { setSearchValue, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
