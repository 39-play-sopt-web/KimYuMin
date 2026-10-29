export interface Movie {
  id: number;
  title: string;
  posterUrl: string | null;
  releaseDate: string;
  overview: string;
  rating: number;
}

export interface MovieDetail {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
}
