export interface albumDetailsSliceProps {
  details?: {
    id: string;
    name: string;
    images: Array<{
      url: string;
    }>;
    release_date: string;
    total_tracks: number;
    artists: Array<{
      id: string;
      name: string;
    }>;
    tracks: {
      items: Array<{
        id: string;
        name: string;
        duration_ms: number;
      }>;
    };
  };
}
