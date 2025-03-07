import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import SpotifyCards from "./SpotifyCards";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { getTopArtists } from "../app/topArtists/topArtistsSlice";
import { useSelector } from "react-redux";
import { imagePlaceholder } from "../../public/imagePlaceholder";

const TopArtists: React.FC = () => {
  const topArtists = useSelector(
    (state: RootState) => state.topArtists.artists
  );
  const dispatch = useDispatch<AppDispatch>();
  const redirectPrefix = "/artist";

  const loadTopArtists = () => {
    dispatch(getTopArtists());
  };

  useEffect(() => {
    loadTopArtists();
  }, []);

  return (
    <Box
      sx={{
        fontFamily: "sans-serif",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        minHeight: "100%",
      }}
    >
      <Box
        sx={{
          border: "1px solid gray",
          borderRadius: "5px 5px 0 0",
          minHeight: "30%",
          backgroundColor: "#EBEFF5",
          display: "flex",
          alignItems: "center",
          paddingLeft: 2,
          fontWeight: "bold",
        }}
      >
        <Typography sx={{ fontWeight: "bold" }}>My Top Artists</Typography>
      </Box>
      <Box
        sx={{
          border: "1px solid gray",
          height: "85%",
          borderRadius: "0 0 5px 5px",
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          padding: "1% 5%",
          alignItems: "center",
          justifyContent: "center",
          borderTop: 0,
        }}
      >
        {topArtists.items?.map((artist) => (
          <SpotifyCards
            key={artist.id}
            image={
              artist.images?.[0]?.url ? artist.images[0].url : imagePlaceholder
            }
            main={artist.name}
            secondary={artist.genres?.[0]}
            redirection={redirectPrefix + "?id=" + artist.id}
          />
        ))}
      </Box>
    </Box>
  );
};

export default TopArtists;
