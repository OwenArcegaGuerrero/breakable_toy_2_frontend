import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const LoginComponent: React.FC = () => {
  function handleLogin() {
    fetch("http://localhost:8080/auth/spotify", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "media-type": "text/plain",
      },
    })
      .then((res) => res.text())
      .then((data) => (window.location.href = data));
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "2px solid red",
        width: "100%",
        height: "100%",
        paddingTop: "5%",
        p: "7% 5%",
      }}
    >
      <Box
        sx={{
          width: "80%",
          height: "80%",
          border: "5px solid #07077a",
          borderRadius: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20vh",
        }}
      >
        <Box sx={{ fontSize: "5rem", fontFamily: "sans-serif" }}>
          Login to Spotify
        </Box>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#0f71d4",
            height: "8.5vh",
            width: "20%",
            fontSize: "1.3rem",
            fontFamily: "sans-serif",
            textTransform: "none",
          }}
          onClick={() => handleLogin()}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default LoginComponent;
