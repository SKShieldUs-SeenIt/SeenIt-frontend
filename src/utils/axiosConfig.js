// src/utils/axiosConfig.js
import axios from 'axios';

// JWT 가져오기
const token = localStorage.getItem('jwt');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
