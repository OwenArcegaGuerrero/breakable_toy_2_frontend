import { Box, Typography } from "@mui/material";
import React from "react";
import SpotifyCards from "./SpotifyCards";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { imagePlaceholder } from "../../public/imagePlaceholder";

const SearchResults: React.FC = () => {
  const searchResults = useSelector(
    (state: RootState) => state.search.searchResults
  );

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
          gap: 4,
          height: "90%",
          border: "1px solid black",
          borderRadius: "10px",
          padding: 5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: 3,
            width: "100%",
            border: "1px solid #7d7d7d",
            borderRadius: "10px",
            height: "17vh",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "-10px",
              left: "10px",
              backgroundColor: "white",
              px: 1,
            }}
          >
            <Typography variant="body2">Tracks</Typography>
          </Box>
          {searchResults.tracks?.items.map((track, index) => (
            <SpotifyCards
              key={String(track.name) + index}
              image={
                track.album.images?.[0]?.url
                  ? track.album.images[0].url
                  : imagePlaceholder
              }
              main={track.explicit ? track.name + " - E" : track.name}
              secondary={track.artists[0].name}
            />
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: 3,
            width: "100%",
            border: "1px solid #7d7d7d",
            borderRadius: "10px",
            height: "17vh",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "-10px",
              left: "10px",
              backgroundColor: "white",
              px: 1,
            }}
          >
            <Typography variant="body2">Albums</Typography>
          </Box>
          {searchResults.albums?.items.map((album, index) => (
            <SpotifyCards
              key={String(album.name) + index}
              image={
                album.images?.[0]?.url ? album.images[0].url : imagePlaceholder
              }
              main={album.name}
              secondary={album.artists.map((artist) => artist.name).join(", ")}
              redirection={"/album?id=" + album.id}
            />
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: 3,
            width: "100%",
            border: "1px solid #7d7d7d",
            borderRadius: "10px",
            height: "17vh",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "-10px",
              left: "10px",
              backgroundColor: "white",
              px: 1,
            }}
          >
            <Typography variant="body2">Playlists</Typography>
          </Box>
          {searchResults.playlists?.items.map((playlist, index) =>
            playlist ? (
              <SpotifyCards
                key={String(playlist.name) + index}
                image={
                  playlist.images?.[0]?.url
                    ? playlist.images[0].url
                    : imagePlaceholder
                }
                main={playlist.name ? playlist.name : ""}
                secondary={playlist.owner.display_name}
                third={"Songs: " + playlist.tracks.total}
              />
            ) : (
              <></>
            )
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: 3,
            width: "100%",
            border: "1px solid #7d7d7d",
            borderRadius: "10px",
            height: "17vh",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "-10px",
              left: "10px",
              backgroundColor: "white",
              px: 1,
            }}
          >
            <Typography variant="body2">Artists</Typography>
          </Box>
          {searchResults.artists?.items.map((artist, index) => (
            <SpotifyCards
              key={String(artist.name) + index}
              image={
                artist.images?.[0]?.url
                  ? artist.images[0].url
                  : imagePlaceholder
              }
              main={artist.name}
              secondary={artist.genres?.map((genre) => genre).join(", ")}
              redirection={"/artist?id=" + artist.id}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default SearchResults;
