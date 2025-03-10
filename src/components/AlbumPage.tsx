import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import GoBackButton from "./GoBackButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { getAlbumDetails } from "../app/albumDetails/albumDetailsSlice";
import { imagePlaceholder } from "../../public/imagePlaceholder";
import AlbumSongsTable from "./AlbumSongsTable";
import { getColorsFromImage, getContrastYIQ } from "../utils";

const AlbumPage: React.FC = () => {
  const [primaryColor, setPrimaryColor] = useState<string>("#333");

  const calculateTotalDuration = (tracks: Array<{ duration_ms: number }>) => {
    const totalMilisecondDuration: number = tracks.reduce(
      (acc, track) => acc + track.duration_ms,
      0
    );
    let hours = Math.floor(totalMilisecondDuration / 3600000);
    let minutes = Math.floor((totalMilisecondDuration % 3600000) / 60000);
    let seconds = Math.floor((totalMilisecondDuration % 60000) / 1000);

    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");

    if (hours > 0) {
      const formattedHours = hours.toString().padStart(2, "0");
      return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const albumDetails = useSelector(
    (state: RootState) => state.albumDetails.details
  );
  const dispatch = useDispatch<AppDispatch>();

  const getDetails = () => {
    const queryParams = window.location.search;
    const urlParams = new URLSearchParams(queryParams);
    const id = urlParams.get("id");
    if (id) {
      dispatch(getAlbumDetails(id));
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  // Extraer el color primario de la portada del álbum para ajustar los estilos
  useEffect(() => {
    if (albumDetails?.images?.[0]?.url) {
      getColorsFromImage(albumDetails.images[0].url)
        .then((colors) => {
          if (colors.length > 0) {
            setPrimaryColor(colors[0].hex);
          }
        })
        .catch((error) =>
          console.error("Error extrayendo colores del álbum:", error)
        );
    }
  }, [albumDetails]);

  return (
    <Box sx={{ width: "100%", backgroundColor: primaryColor, color: "#fff" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          minHeight: "100vh",
          minWidth: "100vw",
          padding: 5,
          fontFamily: "sans-serif",
          gap: 4,
        }}
      >
        <Box
          data-testid="go-back-button"
          sx={{ display: "flex", width: "100%", height: "7vh" }}
        >
          <GoBackButton />
        </Box>
        <Box sx={{ width: "100%" }}>
          <h1 style={{ color: getContrastYIQ(primaryColor) }}>
            {albumDetails?.name}
          </h1>
          <Box sx={{ display: "flex", gap: 5 }}>
            <img
              src={albumDetails?.images?.[0]?.url || imagePlaceholder}
              width="256px"
              style={{ borderRadius: "10px" }}
              alt="Album cover"
            />
            <Box
              sx={{
                border: `1px solid ${getContrastYIQ(primaryColor)}`,
                width: "100%",
                paddingLeft: 5,
                borderRadius: "5px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <p style={{ color: getContrastYIQ(primaryColor) }}>
                  Release Date: {albumDetails?.release_date}
                </p>
                <p style={{ color: getContrastYIQ(primaryColor) }}>
                  Total songs: {albumDetails?.total_tracks}
                </p>
                <p style={{ color: getContrastYIQ(primaryColor) }}>
                  Total Duration:{" "}
                  {albumDetails?.tracks
                    ? calculateTotalDuration(albumDetails.tracks.items)
                    : "00:00"}
                </p>
                <p style={{ color: getContrastYIQ(primaryColor) }}>
                  Artists:{" "}
                  {albumDetails?.artists
                    ? albumDetails.artists
                        .map((artist) => artist.name)
                        .join(", ")
                    : ""}
                </p>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{ width: "100%" }}>
          <h2 style={{ color: getContrastYIQ(primaryColor) }}>Album Songs</h2>
          <AlbumSongsTable
            songs={albumDetails?.tracks ? albumDetails.tracks.items : []}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AlbumPage;
