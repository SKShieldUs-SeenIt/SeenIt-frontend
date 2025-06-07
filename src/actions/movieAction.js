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