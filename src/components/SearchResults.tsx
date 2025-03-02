import { Box } from "@mui/material";
import React from "react";
import SpotifyCards from "./SpotifyCards";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const SearchResults: React.FC = () => {
  const searchResults = useSelector(
    (state: RootState) => state.search.searchResults
  );

  const defaultImage =
    "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228";

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Box
        sx={{
          fontFamily: "sans-serif",
          fontWeight: "bold",
          fontSize: "1.5rem",
          height: "10%",
        }}
      >
        Search Results
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: 3,
          height: "90%",
          border: "1px solid black",
          borderRadius: "10px",
          padding: 5,
        }}
      >
        {searchResults.tracks?.items.map((track) => (
          <SpotifyCards
            key={track.name}
            image={
              track.album.images?.[0]?.url
                ? track.album.images[0].url
                : defaultImage
            }
            main={track.explicit ? track.name + " - E" : track.name}
            secondary={track.artists[0].name}
          />
        ))}
        {searchResults.albums?.items.map((album) => (
          <SpotifyCards
            key={album.name}
            image={album.images?.[0]?.url ? album.images[0].url : defaultImage}
            main={album.name}
            secondary={album.artists.map((artist) => artist.name).join(", ")}
          />
        ))}
        {searchResults.playlists?.items.map((playlist) =>
          playlist ? (
            <SpotifyCards
              key={playlist.name}
              image={
                playlist.images?.[0]?.url
                  ? playlist.images[0].url
                  : defaultImage
              }
              main={playlist.name ? playlist.name : ""}
              secondary={playlist.owner.display_name}
              third={"Songs: " + playlist.tracks.total}
            />
          ) : (
            <></>
          )
        )}
        {searchResults.artists?.items.map((artist) => (
          <SpotifyCards
            key={artist.name}
            image={
              artist.images?.[0]?.url ? artist.images[0].url : defaultImage
            }
            main={artist.name}
          />
        ))}
      </Box>
    </Box>
  );
};

export default SearchResults;
