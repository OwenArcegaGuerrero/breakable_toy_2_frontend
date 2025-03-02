import { Box } from "@mui/material";
import React from "react";

interface Props {
  image: string;
  main: string;
  secondary?: string;
  third?: string;
}

const SpotifyCards: React.FC<Props> = ({ main, secondary, third, image }) => {
  return (
    <Box
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
