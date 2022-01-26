import axios from 'axios';

export const movieDB = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie',
  params: {
    api_key: 'a9563946a44445795b4e8183ec65ccc5',
    language: 'es-ES',
  },
});
