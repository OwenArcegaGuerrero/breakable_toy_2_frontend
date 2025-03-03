import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import {
  getArtistDetails,
  setArtistId,
} from "../app/artistDetails/artistDetailsSlice";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ArtistTopTracksTable from "./ArtistTopTracksTable";
import { imagePlaceholder } from "../../public/imagePlaceholder";
import SpotifyCards from "./SpotifyCards";
import GoBackButton from "./GoBackButton";

const ArtistPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const artistDetails = useSelector(
    (state: RootState) => state.artistDetails.details
  );
  const navigate = useNavigate();

  const getDetails = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");
    if (id) {
      dispatch(setArtistId(id));
      dispatch(getArtistDetails());
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    getDetails();
  }, []);
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
      }}
    >
      <Box sx={{ display: "flex", width: "100%", height: "7vh" }}>
        <GoBackButton />
      </Box>
      <Box>
        <h1>{artistDetails.artistDetails?.name}</h1>
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
            }}
          />
        </Box>
      </Box>
      <Box sx={{ width: "100%" }}>
        <h2>Popular songs</h2>
        <ArtistTopTracksTable
          topTracks={
            artistDetails.artistTopTracks ? artistDetails.artistTopTracks : {}
          }
        />
      </Box>
      <Box sx={{ width: "100%" }}>
        <h2>Discography</h2>
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
            border: "1px solid lightgray",
          }}
        >
          {artistDetails.artistAlbums?.items ? (
            artistDetails.artistAlbums.items.map((album) => (
              <SpotifyCards
                key={album.id}
                image={
                  album.images?.[1].url ? album.images[1].url : imagePlaceholder
                }
                main={album.name ? album.name : ""}
                secondary={album.release_date}
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
