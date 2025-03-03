export interface ArtistTopTracksTableProps {
  topTracks: {
    tracks?: [
      {
        album?: {
          images?: Array<{ url?: string }>;
        };
        name?: string;
        popularity?: number;
        duration_ms?: number;
        id?: string;
      }
    ];
  };
}
