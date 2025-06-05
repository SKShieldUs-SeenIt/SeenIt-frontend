// src/actions/movieAction.js
import axios from 'axios';
import {
  fetchPopularMoviesStart,
  fetchPopularMoviesSuccess,
  fetchPopularMoviesFailure,
  fetchSearchMoviesStart,
  fetchSearchMoviesSuccess,
  fetchSearchMoviesFailure,
} from '../reducers/movieSlice';

export const fetchPopularMovies = (count = 10) => async (dispatch) => {
  dispatch(fetchPopularMoviesStart());
  try {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/movies/popular`, {
      params: { count },
    });
            console.log('✅ [fetchPopularMovies] 응답 데이터:', response.data);

    dispatch(fetchPopularMoviesSuccess(response.data));
  } catch (error) {
    dispatch(fetchPopularMoviesFailure(error.message));
  }
};

// 🔍 검색용 액션 추가
export const fetchSearchMovies = (title, page = 0, size = 20) => async (dispatch) => {
  dispatch(fetchSearchMoviesStart());
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/movies/search`, {
      params: {
        title,
        page,
        size,
        sortBy: 'voteAverage',
        sortDirection: 'desc',
      },
    });

    dispatch(fetchSearchMoviesSuccess(response.data.content)); // 💡 content 배열만 사용
  } catch (error) {
    dispatch(fetchSearchMoviesFailure(error.message));
  }
};
