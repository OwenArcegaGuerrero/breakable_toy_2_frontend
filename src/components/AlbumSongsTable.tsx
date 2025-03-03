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

const AlbumSongsTable: React.FC<AlbumSongsTableProps> = (songs) => {
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
            <TableRow key={song.id}>
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
