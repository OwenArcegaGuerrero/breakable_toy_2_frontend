export interface ArtistTopTracksTableProps {
  topTracks: {
    tracks?: Array<{
      album?: {
        images?: Array<{ url?: string }>;
      };
      name?: string;
      popularity?: number;
      duration_ms?: number;
      id?: string;
    }>;
  };
}
