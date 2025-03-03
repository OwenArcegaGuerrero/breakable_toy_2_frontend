export interface artistDetailsSliceProps {
  details: {
    artistDetails?: {
      name?: string;
      images?: [
        {
          url: string;
        }
      ];
    };
    artistTopTracks?: {};
    artistAlbums?: {
      items?: Array<{
        images?: Array<{ url?: string }>;
        name?: string;
        release_date?: string;
        id?: string;
      }>;
    };
  };
}
