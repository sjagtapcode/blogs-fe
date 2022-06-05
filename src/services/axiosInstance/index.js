import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_BASE_URL}`,
  timeout: 1000,
  headers: { 'X-Custom-Header': localStorage.getItem('tokenId') },
});

export default axiosInstance;
