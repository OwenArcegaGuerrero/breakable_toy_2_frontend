import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../app/store";
import { getArtistDetails } from "../app/artistDetails/artistDetailsSlice";
import { Box } from "@mui/material";
import ArtistTopTracksTable from "./ArtistTopTracksTable";
import { imagePlaceholder } from "../../public/imagePlaceholder";
import SpotifyCards from "./SpotifyCards";
import GoBackButton from "./GoBackButton";
import { getColorsFromImage, getContrastYIQ } from "../utils";

const ArtistPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const artistDetails = useSelector(
    (state: RootState) => state.artistDetails.details
  );

  const [primaryColor, setPrimaryColor] = useState<string>("#333");

  const getDetails = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");
    if (id) {
      dispatch(getArtistDetails(id));
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  useEffect(() => {
    if (artistDetails?.artistDetails?.images?.[0]?.url) {
      getColorsFromImage(artistDetails.artistDetails.images[0].url).then(
        (colors) => {
          if (colors.length > 0) {
            setPrimaryColor(colors[0].hex);
          }
        }
      );
    }
  }, [artistDetails]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        minHeight: "100vh",
        minWidth: "100vw",
        padding: 5,
        fontFamily: "sans-serif",
        gap: 3,
        backgroundColor: primaryColor,
        color: "#fff",
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
          {artistDetails.artistDetails?.name}
        </h1>
        <Box>
          <img
            src={
              artistDetails.artistDetails?.images?.[0]?.url
                ? artistDetails.artistDetails.images[0].url
                : imagePlaceholder
            }
            width={"256px"}
            style={{
              borderRadius: "10px",
              border: `4px solid ${primaryColor}`,
            }}
          />
        </Box>
      </Box>
      <Box sx={{ width: "100%" }}>
        <h2 style={{ color: getContrastYIQ(primaryColor) }}>Popular songs</h2>
        <ArtistTopTracksTable
          topTracks={
            artistDetails.artistTopTracks ? artistDetails.artistTopTracks : []
          }
        />
      </Box>
      <Box sx={{ width: "100%" }}>
        <h2 style={{ color: getContrastYIQ(primaryColor) }}>Discography</h2>
        <Box
          sx={{
            width: "100%",
            minHeight: "20vh",
            display: "flex",
            padding: 1,
            gap: 2,
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            border: `1px solid black`,
            borderRadius: "10px",
          }}
        >
          {artistDetails.artistAlbums?.items ? (
            artistDetails.artistAlbums.items.map((album) => (
              <SpotifyCards
                key={album.id}
                image={
                  album.images?.[1]?.url
                    ? album.images[1].url
                    : imagePlaceholder
                }
                main={album.name ? album.name : ""}
                secondary={album.release_date}
                redirection={"/album?id=" + album.id}
              />
            ))
          ) : (
            <></>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ArtistPage;
