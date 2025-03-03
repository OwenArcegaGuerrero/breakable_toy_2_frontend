import React from "react";
import SearchBar from "./SearchBar";
import TopArtists from "./TopArtists";
import SearchResults from "./SearchResults";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const Dashboard: React.FC = () => {
  const searchResults = useSelector(
    (state: RootState) => state.search.searchResults
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        minHeight: "100vh",
        padding: 5,
        paddingTop: 2,
        boxSizing: "border-box",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
      }}
    >
      <Box sx={{ height: "20%", width: "50%" }}>
        <SearchBar />
      </Box>
      <Box sx={{ height: "40vh", width: "90%" }}>
        <TopArtists />
      </Box>
      {searchResults && Object.keys(searchResults).length > 0 ? (
        <Box sx={{ minHeight: "30vh", width: "90%" }}>
          <SearchResults />
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default Dashboard;
