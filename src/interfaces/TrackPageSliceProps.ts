export interface TrackPageSliceProps {
  details: {
    id?: string;
    name?: string;
    album?: {
      images?: Array<{
        url?: string;
      }>;
    };
    duration_ms?: number;
  };
  position: number;
}
