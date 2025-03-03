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
import { ArtistTopTracksTableProps } from "../interfaces/ArtistTopTracksTableProps";
import { imagePlaceholder } from "../../public/imagePlaceholder";
import { convertMiliseconds } from "../utils";

const ArtistTopTracksTable: React.FC<ArtistTopTracksTableProps> = (
  topTracks
) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Song Name</TableCell>
            <TableCell>Popularity</TableCell>
            <TableCell>Song Length</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {topTracks.topTracks.tracks?.map((track, index) => (
            <TableRow
              key={track.id}
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
                    track.album?.images?.[1]
                      ? track.album.images[1].url
                      : imagePlaceholder
                  }
                  width="64px"
                  style={{ borderRadius: "5px" }}
                />
              </TableCell>
              <TableCell>{track.name}</TableCell>
              <TableCell>{track.popularity}</TableCell>
              <TableCell>
                {track.duration_ms
                  ? convertMiliseconds(track.duration_ms)
                  : "00:00"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ArtistTopTracksTable;
