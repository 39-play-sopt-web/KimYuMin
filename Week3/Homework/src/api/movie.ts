import axios from "axios";
import type { Movie, MovieDetail } from "../types/movie";

interface MovieListResponse {
  results: {
    id: number;
    title: string;
    poster_path: string | null;
    release_date: string;
    overview: string;
    vote_average: number;
  }[];
}

export async function getMovies(): Promise<Movie[]> {
  const response = await axios.get<MovieListResponse>(
    `${import.meta.env.VITE_API_BASE_URL}/movie/popular`,
    {
      params: {
        api_key: import.meta.env.VITE_API_KEY,
        language: "ko-KR",
        page: 1,
      },
    },
  );

  return response.data.results.map((movie) => ({
    id: movie.id,
    title: movie.title,
    posterUrl: movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : null,
    releaseDate: movie.release_date,
    overview: movie.overview,
    rating: movie.vote_average,
  }));
}

export async function getMovieDetail(movieId: string): Promise<MovieDetail> {
  const response = await axios.get<MovieDetail>(
    `${import.meta.env.VITE_API_BASE_URL}/movie/${movieId}`,
    {
      params: {
        api_key: import.meta.env.VITE_API_KEY,
        language: "ko-KR",
      },
    },
  );

  return response.data;
}
