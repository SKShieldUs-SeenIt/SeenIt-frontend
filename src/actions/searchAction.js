// src/actions/searchAction.js
import axios from 'axios';
import {
  fetchSearchStart,
  fetchSearchSuccess,
  fetchSearchFailure,
} from '../reducers/searchSlice';

export const fetchSearchResults = (title) => async (dispatch) => {
  dispatch(fetchSearchStart());

  try {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/api/movies/search`,
      {
        params: {
          title,
          page: 0,
          size: 20,
          sortBy: 'voteAverage',
          sortDirection: 'desc',
        },
      }
    );

    console.log('[✅ 검색 결과 응답]', response.data);

    dispatch(fetchSearchSuccess(response.data.content)); // 중요!
  } catch (error) {
    console.error('[❌ 검색 실패]', error);
    dispatch(fetchSearchFailure(error.message));
  }
};
