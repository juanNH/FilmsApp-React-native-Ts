import {useEffect, useState} from 'react';

import {movieDB} from '../api/movieDB';
import {Movie, MovieDBResponse} from '../interfaces/MovieInterface';

interface MoviesState {
  cineFilms: Movie[];
  popularsFilms: Movie[];
  topRatedFilms: Movie[];
  upComingFilms: Movie[];
}

export const useMovies = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [moviesState, setMoviesState] = useState<MoviesState>({
    cineFilms: [],
    popularsFilms: [],
    topRatedFilms: [],
    upComingFilms: [],
  });

  const getMovies = async () => {
    const cineFilmsPromise = movieDB.get<MovieDBResponse>('/now_playing');
    const popularsFilmsPromise = movieDB.get<MovieDBResponse>('/popular');
    const topRatedFilmsPromise = movieDB.get<MovieDBResponse>('/top_rated');
    const upComingFilmsPromise = movieDB.get<MovieDBResponse>('/upcoming');

    const callMovieApi = await Promise.all([
      cineFilmsPromise,
      popularsFilmsPromise,
      topRatedFilmsPromise,
      upComingFilmsPromise,
    ]);

    setMoviesState({
      cineFilms: callMovieApi[0].data.results,
      popularsFilms: callMovieApi[1].data.results,
      topRatedFilms: callMovieApi[2].data.results,
      upComingFilms: callMovieApi[3].data.results,
    });
    setIsLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);
  return {
    ...moviesState,
    isLoading,
  };
};
