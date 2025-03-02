import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputAdornment } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { getSearchResult, setSearchValue } from "../app/search/searchSlice";

const SearchBar: React.FC = () => {
  const [searchBar, setSearchBar] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key == "Enter") {
      e.preventDefault();
      dispatch(setSearchValue(searchBar));
      handleSearch();
    }
  };

  const handleClick = () => {
    dispatch(setSearchValue(searchBar));
    handleSearch();
  };

  const handleSearch = () => {
    dispatch(getSearchResult());
  };

  return (
    <TextField
      value={searchBar}
      onKeyDown={handleKeyDown}
      onChange={(e) => {
        setSearchBar(e.target.value);
      }}
      fullWidth
      sx={{ height: "100%" }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <IconButton onClick={handleClick}>
                <SearchIcon></SearchIcon>
              </IconButton>
            </InputAdornment>
          ),
          sx: { borderRadius: "20px" },
        },
      }}
    />
  );
};

export default SearchBar;
