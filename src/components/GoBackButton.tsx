import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../app/store";
import { clearAlbumDetails } from "../app/albumDetails/albumDetailsSlice";
import { clearArtistDetails } from "../app/artistDetails/artistDetailsSlice";
import { clearTopArtists } from "../app/topArtists/topArtistsSlice";
import { clearTrackDetails } from "../app/trackDetails/trackDetailsSlice";
import { clearSearch } from "../app/search/searchSlice";
import { clearPlaylistDetails } from "../app/playlistDetails/playlistDetailsSlice";

const GoBackButton: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const clearSlicesState = () => {
    dispatch(clearAlbumDetails());
    dispatch(clearArtistDetails());
    dispatch(clearSearch());
    dispatch(clearTopArtists());
    dispatch(clearTrackDetails());
    dispatch(clearPlaylistDetails());
  };
  const hanleClick = () => {
    clearSlicesState();
    navigate(-1);
  };
  return (
    <Button
      onClick={hanleClick}
      variant="outlined"
      sx={{
        width: "10%",
        borderColor: "gray",
        color: "black",
        backgroundColor: "lightgray",
        "&:hover": {
          boxShadow: 5,
        },
        textTransform: "none",
      }}
    >
      Go Back
    </Button>
  );
};

export default GoBackButton;
