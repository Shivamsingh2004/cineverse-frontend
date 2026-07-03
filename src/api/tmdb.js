import axios from 'axios';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const READ_TOKEN = import.meta.env.VITE_TMDB_READ_TOKEN;
const BASE_URL = 'https://api.themoviedb.org/3';
const tmdbInstance = axios.create({
  baseURL: BASE_URL,
  headers: READ_TOKEN
    ? { Authorization: `Bearer ${READ_TOKEN}` }
    : {},
  params: READ_TOKEN
    ? {}
    : { api_key: API_KEY },
});
export const requests = {
  fetchTrending:      '/trending/movie/week',
  fetchTopRated:      '/movie/top_rated',
  fetchPopular:       '/movie/popular',
  fetchUpcoming:      '/movie/upcoming',
  fetchNowPlaying:    '/movie/now_playing',
  fetchActionMovies:  '/discover/movie?with_genres=28',
  fetchComedyMovies:  '/discover/movie?with_genres=35',
  fetchHorrorMovies:  '/discover/movie?with_genres=27',
  fetchRomanceMovies: '/discover/movie?with_genres=10749',
  fetchDocumentaries: '/discover/movie?with_genres=99',
  fetchSciFi:         '/discover/movie?with_genres=878',
  fetchAnimation:     '/discover/movie?with_genres=16',
};
export const fetchTmdbData = async (url) => {
  try {
    const response = await tmdbInstance.get(url);
    return response.data.results || [];
  } catch (error) {
    console.error('TMDB fetch failed:', error.message);
    return [];
  }
};
export const fetchTmdbDetails = async (id) => {
  try {
    const response = await tmdbInstance.get(`/movie/${id}`, {
      params: { append_to_response: 'credits,videos,similar,reviews' },
    });
    return response.data;
  } catch (error) {
    console.error('TMDB details fetch failed:', error.message);
    return null;
  }
};
export const searchTmdbMovies = async (query) => {
  try {
    const response = await tmdbInstance.get('/search/movie', {
      params: { query, include_adult: false },
    });
    return response.data.results || [];
  } catch (error) {
    console.error('TMDB search failed:', error.message);
    return [];
  }
};
export const IMG_BASE = 'https://image.tmdb.org/t/p';
export const posterUrl = (path, size = 'w500') => path ? `${IMG_BASE}/${size}${path}` : null;
export const backdropUrl = (path, size = 'original') => path ? `${IMG_BASE}/${size}${path}` : null;
