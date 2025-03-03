import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../app/store";
import { setArtistId } from "../app/artistDetails/artistDetailsSlice";

const GoBackButton: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const hanleClick = () => {
    dispatch(setArtistId(""));
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
      }}
    >
      Go Back
    </Button>
  );
};

export default GoBackButton;
