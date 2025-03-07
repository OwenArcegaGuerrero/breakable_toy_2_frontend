import { Box, IconButton } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { convertMiliseconds, getContrastYIQ, getIdFromURL } from "../utils";
import {
  PauseCircleFilledOutlined,
  PlayCircleFilledOutlined,
} from "@mui/icons-material";
import LinearProgress from "@mui/material/LinearProgress";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { useDispatch } from "react-redux";
import { setPosition } from "../app/trackDetails/trackDetailsSlice";

interface PlayerComponentProps {
  bgColor: string;
}

const Player: React.FC<PlayerComponentProps> = ({ bgColor }) => {
  const position = useSelector(
    (state: RootState) => state.trackDetails.position
  );
  const dispatch = useDispatch<AppDispatch>();
  const [trackDuration, setTrackDuration] = useState<string>("");
  const [accessToken, setAccessToken] = useState<string>("");
  const [player, setPlayer] = useState<any>(); // Ajusta el tipado según tu interfaz
  const [active, setActive] = useState<boolean>(false);
  const [trackId, setTrackId] = useState<string>("");
  const [trackProgressText, setTrackProgressText] = useState<string>("00:00");
  const [trackProgress, setTrackProgress] = useState<number>(0);
  const [currentPosition, setCurrentPosition] = useState<number>(0);
  const [trackDurationMs, setTrackDurationMs] = useState<number>(0);
  const location = useLocation();

  // Usamos un ref para almacenar el device id de forma inmediata
  const deviceIdRef = useRef<string>("");

  // Actualiza el trackId cada vez que cambie la URL
  useEffect(() => {
    setTrackId(getIdFromURL() || "");
  }, [location.search]);

  const fetchToken = async () => {
    try {
      const response = await fetch("http://localhost:8080/token", {
        headers: {
          "content-type": "application/json",
          "media-type": "text/plain",
        },
      });
      const token = await response.text();
      setAccessToken(token);
    } catch (error) {
      console.error("Error fetching token:", error);
    }
  };

  useEffect(() => {
    fetchToken();
    if (position == 0) {
      setTrackProgress(0);
      setTrackProgressText("0:00");
      console.log(trackProgress);
      console.log(trackProgressText);
    }
  }, []);

  const transferPlayback = async (deviceId: string) => {
    const url = "https://api.spotify.com/v1/me/player";
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          device_ids: [deviceId],
          play: false, // Evita que empiece a reproducir automáticamente
        }),
      });

      if (!response.ok) throw new Error("Error en transferencia");
      console.log("Playback transferido correctamente");
    } catch (error) {
      console.error("Error al transferir playback:", error);
    }
  };

  // Inicialización del SDK de Spotify Web Playback
  useEffect(() => {
    if (!accessToken) return;
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const playerInstance = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb: Function) => {
          cb(accessToken);
        },
        volume: 0.5,
      });

      setPlayer(playerInstance);

      playerInstance.addListener("ready", ({ device_id }) => {
        deviceIdRef.current = device_id;
        console.log("Device ID actualizado:", deviceIdRef);
        // Transferir el playback al nuevo dispositivo
        transferPlayback(device_id);
      });

      playerInstance.addListener("player_state_changed", (state) => {
        if (state) {
          setTrackDuration(convertMiliseconds(state.duration));
          setTrackDurationMs(state.duration);
        }
      });

      playerInstance.connect();
    };
  }, [accessToken]);

  // Función para iniciar o pausar la reproducción
  const togglePlayer = async () => {
    if (!deviceIdRef.current) {
      console.error("No se encontró dispositivo activo.");
      return;
    }
    if (!active) {
      // Iniciar reproducción con el track seleccionado
      const url = "https://api.spotify.com/v1/me/player/play";
      const body = {
        uris: trackId ? [`spotify:track:${trackId}`] : undefined,
        position_ms: position > 0 ? position : 0,
      };
      try {
        const res = await fetch(url, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        if (!res.ok) {
          const errorMsg = await res.text();
          console.error("Error al iniciar la reproducción:", errorMsg);
        } else {
          setActive(true);
        }
      } catch (error) {
        console.error("Error en la petición play:", error);
      }
    } else {
      // Pausar reproducción
      const url = "https://api.spotify.com/v1/me/player/pause";
      try {
        const res = await fetch(url, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          const errorMsg = await res.text();
          console.error("Error al pausar la reproducción:", errorMsg);
        } else {
          setActive(false);
          dispatch(setPosition(currentPosition));
        }
      } catch (error) {
        console.error("Error en la petición pause:", error);
      }
    }
  };

  // Actualiza el progreso de la pista mientras se reproduce
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (active && trackDurationMs > 0) {
      intervalId = setInterval(() => {
        setCurrentPosition((prev) => {
          const newPos = prev + 1000;
          if (newPos >= trackDurationMs) {
            clearInterval(intervalId);
            return trackDurationMs;
          }
          return newPos;
        });
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [active, trackDurationMs]);

  useEffect(() => {
    if (trackDurationMs > 0) {
      setTrackProgress((currentPosition / trackDurationMs) * 100);
      setTrackProgressText(convertMiliseconds(currentPosition));
    }
  }, [currentPosition, trackDurationMs]);

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: bgColor, // Se integra con el primary color de la página
        borderRadius: "50px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "10vh",
          gap: 1,
        }}
      >
        <IconButton
          onClick={togglePlayer}
          sx={{
            padding: 0,
            width: "7%",
            opacity: 0.8,
            transition: "0.3s",
            "&:hover": {
              "--IconButton-hoverBg": "none",
              opacity: 1,
            },
          }}
        >
          {!active ? (
            <PlayCircleFilledOutlined sx={{ height: "100%", width: "100%" }} />
          ) : (
            <PauseCircleFilledOutlined sx={{ height: "100%", width: "100%" }} />
          )}
        </IconButton>
        <Box
          sx={{
            width: "80%",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <p
            style={{
              margin: 0,
              marginBottom: "1px",
              display: "inline-block",
              color: getContrastYIQ(bgColor),
            }}
          >
            {trackProgressText}
          </p>
          <LinearProgress
            variant="determinate"
            value={trackProgress}
            sx={{
              backgroundColor: getContrastYIQ(bgColor),
              borderRadius: "10px",
              height: "0.6vh",
              width: "90%",
              paddingTop: "1px",
            }}
          />
          <p
            style={{
              margin: 0,
              marginBottom: "1px",
              color: getContrastYIQ(bgColor),
            }}
          >
            {trackDuration || "00:00"}
          </p>
        </Box>
      </Box>
    </Box>
  );
};

export default Player;
