export interface PlaylistTracksTableProps {
  tracks: Array<{
    track?: {
      album?: {
        images?: Array<{ url?: string }>;
      };
      name?: string;
      popularity?: number;
      duration_ms?: number;
      id?: string;
    };
  }>;
}
