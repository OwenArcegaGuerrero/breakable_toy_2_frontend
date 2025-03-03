export interface AlbumSongsTableProps {
  songs?: Array<{
    id: string;
    name: string;
    duration_ms: number;
  }>;
}
