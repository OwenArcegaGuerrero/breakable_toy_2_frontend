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
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
          width: "70%",
          height: "50%",
          border: "3px solid darkblue",
          borderRadius: 5,
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "auto",
            textAlign: "center",
            fontFamily: "sans-serif",
            fontSize: "5rem",
          }}
        >
          Login to Spotify
        </Box>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#0f71d4",
            height: "20%",
            width: "20%",
            fontSize: "1.3rem",
            fontFamily: "sans-serif",
            textTransform: "none",
            border: 0,
            borderRadius: 3,
            marginTop: 5,
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
