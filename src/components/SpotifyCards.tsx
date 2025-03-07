import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SpotifyCardsProps } from "../interfaces/SpotifyCardsProps";
import { useNavigate } from "react-router-dom";
import { getColorsFromImage } from "../utils";

const SpotifyCards: React.FC<SpotifyCardsProps> = ({
  main,
  secondary,
  third,
  image,
  redirection,
}) => {
  const [mainColor, setMainColor] = useState<string>("");
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(redirection ? redirection : "");
  };

  const getImageMainColor = async () => {
    const colors = await getColorsFromImage(image);
    setMainColor(colors[0].hex);
  };

  useEffect(() => {
    getImageMainColor();
  }, []);
  return (
    <Box
      onClick={handleClick}
      sx={{
        border: "2px solid",
        borderRadius: "5px",
        borderColor: mainColor,
        width: "14vw",
        maxWidth: "auto",
        maxHeight: "13vh",
        minHeight: "13vh",
        display: "flex",
        padding: 1,
        gap: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
        "&:hover": {
          cursor: "pointer",
          boxShadow: 5,
          backgroundColor: "lightgray",
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
          color: "black",
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
