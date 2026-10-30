import apiClient from "./client";
import type { Movie, MovieDetail } from "../types/movie";

interface MovieListResponse {
  total_pages: number;

  results: {
    id: number;
    title: string;
    poster_path: string | null;
    release_date: string;
    overview: string;
    vote_average: number;
  }[];
}

export async function getMovies(
  page: number = 1,
): Promise<{ movies: Movie[]; totalPages: number }> {
  const response = await apiClient.get<MovieListResponse>(
    "/movie/popular",
    {
      params: {
        page: page,
      },
    },
  );

  const movies = response.data.results.map((movie) => ({
    id: movie.id,
    title: movie.title,
    posterUrl: movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : null,
    releaseDate: movie.release_date,
    overview: movie.overview,
    rating: movie.vote_average,
  }));
  return {
    movies: movies,
    totalPages: Math.min(response.data.total_pages, 500),
  };
}

export async function getMovieDetail(movieId: string): Promise<MovieDetail> {
  const response = await apiClient.get<MovieDetail>(`/movie/${movieId}`);

  return response.data;
}
