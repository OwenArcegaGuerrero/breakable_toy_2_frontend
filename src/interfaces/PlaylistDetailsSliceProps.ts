export interface playlistDetailsSliceProps {
  details?: {
    id: string;
    name: string;
    images: Array<{
      url: string;
    }>;
    owner: {
      display_name: string;
    };
    tracks: {
      items: Array<{
        track?: {
          album?: {
            images?: Array<{
              url?: string;
            }>;
          };
          id: string;
          name: string;
          duration_ms: number;
          popularity: number;
        };
      }>;
    };
  };
}
