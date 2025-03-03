import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const GoBackButton: React.FC = () => {
  const navigate = useNavigate();
  const hanleClick = () => {
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
