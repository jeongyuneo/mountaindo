import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Config from 'react-native-config';

// Axios URL 베이스 설정.
const axiosService = axios.create({
  baseURL: Config.REACT_APP_BE_HOST,
  withCredentials: true,
});

// 토큰값 저장
axiosService.interceptors.request.use(
  async (config: any) => {
    const token = await AsyncStorage.getItem('token');
    config.headers['Content-Type'] = 'application/json; charset=utf-8';
    config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  },
  err => {
    return Promise.reject(err);
  },
);

// 토큰값 에러 발생시
axiosService.interceptors.response.use(
  config => {
    return config;
  },
  err => {
    return Promise.reject(err);
  },
);

export default axiosService;
