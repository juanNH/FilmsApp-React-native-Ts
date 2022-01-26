import {useEffect, useState} from 'react';
import {movieDB} from '../api/movieDB';
import {Cast, CreditsResponse} from '../interfaces/CreditsInterface';
import {MovieFull} from './../interfaces/MovieInterface';

interface MovieDetails {
  isLoading: boolean;
  movieFull?: MovieFull;
  cast: Cast[];
}

export const useMoviesDetails = (movieId: number) => {
  const [state, setState] = useState<MovieDetails>({
    isLoading: true,
    movieFull: undefined,
    cast: [],
  });

  const getMovieDetails = async () => {
    const movieDetailsPromise = await movieDB.get<MovieFull>(`/${movieId}`);
    const castPromise = await movieDB.get<CreditsResponse>(
      `/${movieId}/credits`,
    );

    const [movieDetailsPromiseResponse, castPromiseResponse] =
      await Promise.all([movieDetailsPromise, castPromise]);

    setState({
      isLoading: false,
      movieFull: movieDetailsPromiseResponse.data,
      cast: castPromiseResponse.data.cast,
    });
  };

  useEffect(() => {
    getMovieDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    ...state,
  };
};
