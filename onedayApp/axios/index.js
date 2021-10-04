import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://172.30.1.27:3005',
  timeout: 1000,
});

export default axiosInstance;