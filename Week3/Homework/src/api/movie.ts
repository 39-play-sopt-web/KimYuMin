import apiClient from "./client";
import { ratings } from "../constants/ratings";
import type { RatingFilter } from "../constants/ratings";
import type { Movie, MovieDetail, MovieListResponse } from "../types/movie";

export async function getMovies(
  page: number = 1,
  rating: RatingFilter = ratings[0],
): Promise<{ movies: Movie[]; totalPages: number }> {
  const range = rating.label === "전체" ? undefined : rating;

  const response = await apiClient.get<MovieListResponse>(
    range ? "/discover/movie" : "/movie/popular",
    {
      params: {
        page,
        "vote_average.gte": range?.min,
        "vote_average.lte": range?.max,
      },
    },
  );

  const movies = response.data.results
    .filter(
      (movie) =>
        !range ||
        (movie.vote_average >= range.min &&
          (range.max === undefined || movie.vote_average < range.max)),
    )
    .map((movie) => ({
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
    movies,
    totalPages: Math.min(response.data.total_pages, 500),
  };
}

export async function getMovieDetail(movieId: string): Promise<MovieDetail> {
  const response = await apiClient.get<MovieDetail>(`/movie/${movieId}`);

  return response.data;
}
