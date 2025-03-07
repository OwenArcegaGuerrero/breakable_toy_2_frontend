import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { imagePlaceholder } from "../../public/imagePlaceholder";
import { convertMiliseconds } from "../utils";
import { useNavigate } from "react-router-dom";
import { PlaylistTracksTableProps } from "../interfaces/PlaylistTracksTableProps";

const PlaylistTracksTable: React.FC<PlaylistTracksTableProps> = ({
  tracks,
}) => {
  const navigate = useNavigate();
  const handleClick = (id: string) => {
    navigate("/track?id=" + id);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ backgroundColor: "transparent" }}>
        <TableHead>
          <TableRow>
            <TableCell>
              <b>#</b>
            </TableCell>
            <TableCell>
              <b>Image</b>
            </TableCell>
            <TableCell>
              <b>Song Name</b>
            </TableCell>
            <TableCell>
              <b>Popularity</b>
            </TableCell>
            <TableCell>
              <b>Song Length</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tracks.map((track, index) => (
            <TableRow
              role="button"
              onClick={() => {
                handleClick(track.track?.id || "");
              }}
              key={track.track?.id}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                  backgroundColor: "lightgray",
                  transition: "0.5s",
                },
              }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell>
                <img
                  src={
                    track.track?.album?.images?.[1]
                      ? track.track.album.images[1].url
                      : imagePlaceholder
                  }
                  width="64px"
                  style={{ borderRadius: "5px" }}
                  alt="cover"
                />
              </TableCell>
              <TableCell>{track.track?.name}</TableCell>
              <TableCell>{track.track?.popularity}</TableCell>
              <TableCell>
                {track.track?.duration_ms
                  ? convertMiliseconds(track.track.duration_ms)
                  : "00:00"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PlaylistTracksTable;
