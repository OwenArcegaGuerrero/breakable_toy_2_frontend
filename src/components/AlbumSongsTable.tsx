import React from "react";
import { AlbumSongsTableProps } from "../interfaces/AlbumSongsTableProps";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { convertMiliseconds } from "../utils";
import { useNavigate } from "react-router-dom";

const AlbumSongsTable: React.FC<AlbumSongsTableProps> = (songs) => {
  const navigate = useNavigate();
  const handleClick = (id: string) => {
    navigate("/track?id=" + id);
  };
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Song Name</TableCell>
            <TableCell>Song Length</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {songs.songs?.map((song, index) => (
            <TableRow
              key={song.id}
              role="button"
              onClick={() => {
                handleClick(song.id || "");
              }}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                  backgroundColor: "lightgray",
                  transition: "0.5s",
                },
              }}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>{song.name}</TableCell>
              <TableCell>{convertMiliseconds(song.duration_ms)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AlbumSongsTable;
