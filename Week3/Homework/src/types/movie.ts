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
  release_date: string;
  vote_average: number;
  runtime: number | null;
  vote_count: number;
  genres: {
    id: number;
    name: string;
  }[];
  status: string;
  backdrop_path: string | null;

  /* 기본정보 */
  original_title: string;
  original_language: string;
  production_countries: {
    name: string;
  }[];
  spoken_languages: {
    name: string;
  }[];
  budget: number;
  revenue: number;
}
