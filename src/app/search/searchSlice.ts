import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface search {
  searchValue: string;
  searchResults: {
    tracks?: {
      items: [
        {
          name: string;
          explicit: boolean;
          album: {
            name: string;
            images?: [
              {
                url: string;
              }
            ];
          };
          artists: [
            {
              id: string;
              name: string;
            }
          ];
        }
      ];
    };
    albums?: {
      items: [
        {
          name: string;
          artists: [
            {
              id: string;
              name: string;
            }
          ];
          release_date: string;
          images?: [
            {
              url: string;
            }
          ];
        }
      ];
    };
    playlists?: {
      items: [
        {
          name?: string;
          owner: {
            display_name: string;
          };
          tracks: {
            total: number;
          };
          images?: [
            {
              url: string;
            }
          ];
        }
      ];
    };
    artists?: {
      items: [
        {
          id?: string;
          name: string;
          genres?: string[];
          images?: [
            {
              url: string;
            }
          ];
        }
      ];
    };
  };
}

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
  },
  extraReducers: (builder) => {
    builder.addCase(getSearchResult.fulfilled, (state, action) => {
      state.searchResults = action.payload;
      console.log(state.searchResults);
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

export const { setSearchValue } = searchSlice.actions;
export default searchSlice.reducer;
