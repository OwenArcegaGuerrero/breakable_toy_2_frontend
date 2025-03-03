import { Box } from "@mui/material";
import React from "react";
import { SpotifyCardsProps } from "../interfaces/SpotifyCardsProps";
import { useNavigate } from "react-router-dom";

const SpotifyCards: React.FC<SpotifyCardsProps> = ({
  main,
  secondary,
  third,
  image,
  redirection,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(redirection ? redirection : "");
  };
  return (
    <Box
      onClick={handleClick}
      sx={{
        border: "1px solid lightgray",
        borderRadius: "5px",
        width: "18%",
        maxWidth: "18%",
        maxHeight: "45%",
        minHeight: "45%",
        display: "flex",
        padding: 1,
        gap: 1,
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
        "&:hover": {
          cursor: "pointer",
          boxShadow: 5,
        },
      }}
    >
      <img
        src={image}
        width={"64px"}
        height={"64px"}
        style={{ borderRadius: "10px" }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          width: "70%",
          gap: 1,
        }}
      >
        <p
          style={{
            fontWeight: "bold",
            fontSize: "0.8rem",
            margin: 0,
          }}
        >
          {main}
        </p>
        {secondary && (
          <p style={{ fontSize: "14px", margin: 0 }}>{secondary}</p>
        )}
        {third && <p style={{ fontSize: "14px", margin: 0 }}>{third}</p>}
      </Box>
    </Box>
  );
};

export default SpotifyCards;
