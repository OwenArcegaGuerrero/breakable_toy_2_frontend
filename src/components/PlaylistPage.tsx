import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { getPlaylistDetails } from "../app/playlistDetails/playlistDetailsSlice";
import { getIdFromURL, getColorsFromImage, getContrastYIQ } from "../utils";
import { useNavigate } from "react-router-dom";
import { imagePlaceholder } from "../../public/imagePlaceholder";
import { Box } from "@mui/material";
import GoBackButton from "./GoBackButton";
import PlaylistTracksTable from "./PlaylistTracksTable";

const PlaylistPage: React.FC = () => {
  const playlist = useSelector(
    (state: RootState) => state.playlistDetails.details
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [primaryColor, setPrimaryColor] = useState<string>("#333");

  const loadPlaylistDetails = () => {
    const id = getIdFromURL();
    dispatch(getPlaylistDetails(id || ""));
  };

  useEffect(() => {
    loadPlaylistDetails();
  }, []);

  // Extrae el color primario de la imagen del playlist para ajustar los estilos
  useEffect(() => {
    if (playlist?.images?.[0]?.url) {
      getColorsFromImage(playlist.images[0].url)
        .then((colors) => {
          if (colors.length > 0) {
            setPrimaryColor(colors[0].hex);
          }
        })
        .catch((error) =>
          console.error("Error extrayendo colores del playlist:", error)
        );
    }
  }, [playlist]);

  return (
    <Box
      sx={{
        backgroundColor: primaryColor,
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        minHeight: "100vh",
        minWidth: "100vw",
        padding: 5,
        fontFamily: "sans-serif",
        gap: 3,
      }}
    >
      <Box sx={{ display: "flex", width: "100%", height: "7vh" }}>
        <GoBackButton />
      </Box>
      <Box
        sx={{
          width: "100%",
          borderRadius: "20px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "3rem", color: getContrastYIQ(primaryColor) }}>
          {playlist?.name || ""}
        </h1>
        <Box>
          <img
            src={
              playlist?.images?.[0]?.url
                ? playlist.images[0].url
                : imagePlaceholder
            }
            width={"256px"}
            style={{ borderRadius: "10px" }}
            alt="Playlist cover"
          />
        </Box>
      </Box>
      <Box sx={{ width: "100%" }}>
        <h2 style={{ color: getContrastYIQ(primaryColor) }}>Songs</h2>
        <PlaylistTracksTable
          tracks={playlist?.tracks.items ? playlist.tracks.items : []}
        />
      </Box>
    </Box>
  );
};

export default PlaylistPage;
