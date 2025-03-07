import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { getContrastYIQ, getIdFromURL } from "../utils";
import { getTrackDetails } from "../app/trackDetails/trackDetailsSlice";
import { Box } from "@mui/material";
import { imagePlaceholder } from "../../public/imagePlaceholder";
import Player from "./Player";
import GoBackButton from "./GoBackButton";
import { getColorsFromImage } from "../utils";

const TrackPage: React.FC = () => {
  const trackDetails = useSelector(
    (state: RootState) => state.trackDetails.details
  );
  const dispatch = useDispatch<AppDispatch>();

  // Estado para el color primario extraído de la imagen de la canción
  const [primaryColor, setPrimaryColor] = useState<string>("#333");

  const getDetails = async () => {
    const id = getIdFromURL();
    await dispatch(getTrackDetails(id || ""));
  };

  useEffect(() => {
    getDetails();
  }, []);

  // Cuando los detalles de la pista estén disponibles, extrae el color primario
  useEffect(() => {
    if (trackDetails?.album?.images?.[0]?.url) {
      getColorsFromImage(trackDetails.album.images[0].url)
        .then((colors) => {
          if (colors.length > 0) {
            setPrimaryColor(colors[0].hex);
          }
        })
        .catch((error) =>
          console.error("Error extracting colors from image:", error)
        );
    }
  }, [trackDetails]);

  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        fontFamily: "sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 5,
        gap: 2,
        backgroundColor: primaryColor, // Fondo basado en el color de la imagen
        color: "#fff",
      }}
    >
      <Box sx={{ display: "flex", width: "100%", height: "7vh" }}>
        <GoBackButton />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1 style={{ fontSize: "3rem", color: getContrastYIQ(primaryColor) }}>
          {trackDetails.name}
        </h1>
        <img
          src={trackDetails?.album?.images?.[0]?.url || imagePlaceholder}
          width="18%"
          style={{
            borderRadius: "15px",
            border: `4px solid ${primaryColor}`,
          }}
          alt="Track cover"
        />
      </Box>
      <Box sx={{ width: "80%" }}>
        <Player bgColor={primaryColor} />
      </Box>
    </Box>
  );
};

export default TrackPage;
