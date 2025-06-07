// src/actions/movieAction.js
import axios from 'axios';
import {
  fetchPopularMoviesStart,
  fetchPopularMoviesSuccess,
  fetchPopularMoviesFailure,
  fetchSearchMoviesStart,
  fetchSearchMoviesSuccess,
  fetchSearchMoviesFailure,
   fetchUserRatedMoviesStart,
  fetchUserRatedMoviesSuccess,
  fetchUserRatedMoviesFailure,
  fetchLatestMoviesFailure,
  fetchLatestMoviesSuccess,
  fetchLatestMoviesStart,

    fetchRecommendedMoviesStart,
  fetchRecommendedMoviesSuccess,
  fetchRecommendedMoviesFailure
} from '../reducers/movieSlice';

export const fetchPopularMovies = (count = 10) => async (dispatch) => {
  dispatch(fetchPopularMoviesStart());
  try {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/api/movies/popular`,
      { params: { count } }
    );

    console.log('✅ [fetchPopularMovies] 응답 데이터:', response.data);

    dispatch(fetchPopularMoviesSuccess(response.data));
  } catch (error) {
    console.error('❌ [fetchPopularMovies] 실패:', error);
    dispatch(fetchPopularMoviesFailure(error.message));
  }
};

export const fetchSearchMovies = (title, page = 0, size = 20) => async (dispatch) => {
  dispatch(fetchSearchMoviesStart());
  try {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/movies/search`, {
      params: {
        title,
        page,
        size,
        sortBy: 'voteAverage',
        sortDirection: 'desc',
      },
    });

    console.log('🔍 [fetchSearchMovies] 결과:', response.data);
    dispatch(fetchSearchMoviesSuccess(response.data.content));
  } catch (error) {
    console.error('❌ [fetchSearchMovies] 실패:', error);
    dispatch(fetchSearchMoviesFailure(error.message));
  }
};
export const fetchUserRatedMovies = (userId) => async (dispatch) => {
  dispatch(fetchUserRatedMoviesStart());

  try {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    const url = `/api/ratings/users/${userId}`;
    console.log(`📡 [fetchUserRatedMovies] 요청 URL: ${url}`);

    const res = await axios.get(url);

    console.log('✅ [fetchUserRatedMovies] 응답 데이터:', res.data.content); // 🎯 여기!
    
    dispatch(fetchUserRatedMoviesSuccess(res.data.content));
  } catch (error) {
    console.error('❌ [fetchUserRatedMovies] 요청 실패:', error);
    dispatch(fetchUserRatedMoviesFailure(error.message));
  }
};


export const fetchLatestMovies = (limit = 100) => async (dispatch) => {
  dispatch(fetchLatestMoviesStart());
  try {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/statistics/recently-popular`, {
      params: { limit },
    });

    console.log('[fetchLatestMovies] 응답:', res.data);

    dispatch(fetchLatestMoviesSuccess(res.data)); // ✅ 배열만 넣기
  } catch (err) {
    console.error('[fetchLatestMovies] 실패:', err);
    dispatch(fetchLatestMoviesFailure(err.message));
  }
};

export const fetchRecommendedMovies = (genreName, page = 0, size = 20) => async (dispatch) => {
  dispatch(fetchRecommendedMoviesStart());

  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/api/movies/genre/name/${encodeURIComponent(genreName)}`,
      {
        params: { page, size }
      }
    );

    console.log('[🎥 fetchRecommendedMovies] ✅ 응답:', res.data.content);
    dispatch(fetchRecommendedMoviesSuccess(res.data.content));
  } catch (error) {
    console.error('[🎥 fetchRecommendedMovies] ❌ 에러:', error);
    dispatch(fetchRecommendedMoviesFailure(error.message));
  }
};
