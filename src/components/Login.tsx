import React, { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { GlobalStyles } from "@mui/material";

const LoginComponent: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    class Particle {
      x: number;
      y: number;
      radius: number;
      color: string;
      speedX: number;
      speedY: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 3 + 1;
        this.color = `hsla(${Math.random() * 360}, 70%, 60%, 0.5)`;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const particles: Particle[] = [];
    const numParticles = 1000;
    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle());
    }

    let animationFrameId: number;
    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
    <>
      <GlobalStyles
        styles={`@keyframes borderColorAnimation {
        0% {border-color: rgb(255,0,0);}
        33% {border-color: rgb(0,255,0);}
        66% {border-color: rgb(0,0,255);}
        100% {border-color: rgb(255,0,0);}
      }`}
      />
      <Box
        sx={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
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
              animation: "borderColorAnimation 10s infinite linear",
              background: "rgba(255, 255, 255, 0.8)",
              padding: 3,
            }}
          >
            <h1
              style={{
                width: "100%",
                textAlign: "center",
                fontFamily: "sans-serif",
                fontSize: "5rem",
                margin: 0,
              }}
            >
              Login to Spotify
            </h1>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#0f71d4",
                height: "20%",
                minWidth: "20vw",
                fontSize: "1.3rem",
                fontFamily: "sans-serif",
                textTransform: "none",
                border: 0,
                borderRadius: 3,
                marginTop: 5,
                transition: "transform 0.2s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 6px 12px rgba(0,0,0,0.6)",
                },
              }}
              onClick={handleLogin}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default LoginComponent;
