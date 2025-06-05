// src/actions/movieAction.js
import axios from 'axios';
import {
  fetchPopularMoviesStart,
  fetchPopularMoviesSuccess,
  fetchPopularMoviesFailure,
} from '../reducers/movieSlice';

export const fetchPopularMovies = (count = 10) => async (dispatch) => {
  dispatch(fetchPopularMoviesStart());

  try {
    const token = localStorage.getItem('jwtToken');
    console.log('📦 [fetchPopularMovies] 시작, 요청 개수:', count);
    console.log('🔐 [fetchPopularMovies] JWT 토큰:', token);

    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    const url = `${import.meta.env.VITE_API_BASE_URL}/api/movies/popular`;
    console.log('🌐 [fetchPopularMovies] 요청 URL:', url);

    const response = await axios.get(url, {
      params: { count },
    });

    console.log('✅ [fetchPopularMovies] 응답 데이터:', response.data);

    dispatch(fetchPopularMoviesSuccess(response.data));
  } catch (error) {
    console.error('❌ [fetchPopularMovies] 요청 실패:', error);
    dispatch(fetchPopularMoviesFailure(error.message));
  }
};
