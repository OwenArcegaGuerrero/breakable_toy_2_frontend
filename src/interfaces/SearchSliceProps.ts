export interface search {
  searchValue: string;
  searchResults: {
    tracks?: {
      items: Array<{
        id?: string;
        name: string;
        explicit: boolean;
        album: {
          name: string;
          images?: Array<{
            url: string;
          }>;
        };
        artists: Array<{
          id: string;
          name: string;
        }>;
      }>;
    };
    albums?: {
      items: Array<{
        id?: string;
        name: string;
        artists: Array<{
          id: string;
          name: string;
        }>;
        release_date: string;
        images?: Array<{
          url: string;
        }>;
      }>;
    };
    playlists?: {
      items: Array<{
        id?: string;
        name?: string;
        owner: {
          display_name: string;
        };
        tracks: {
          total: number;
        };
        images?: Array<{
          url: string;
        }>;
      }>;
    };
    artists?: {
      items: [
        {
          id?: string;
          name: string;
          genres?: string[];
          images?: Array<{
            url: string;
          }>;
        }
      ];
    };
  };
}
