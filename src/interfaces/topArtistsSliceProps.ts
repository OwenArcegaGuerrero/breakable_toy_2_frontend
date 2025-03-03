export interface TopArtistsSliceProps {
  artists: {
    items?: [
      {
        genres?: string[];
        id?: string;
        images?: [
          {
            url?: string;
          }
        ];
        name: string;
      }
    ];
  };
}
