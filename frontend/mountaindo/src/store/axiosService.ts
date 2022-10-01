import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Config from 'react-native-config';
import userSlice from '../slices/userSlice/user';

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

// 토큰 만료로 401일 경우 logout 및 AsyncStorage clear
axiosService.interceptors.response.use(
  config => {
    return config;
  },
  async err => {
    const status = err.response ? err.response.status : null;
    if (status === 401) {
      userSlice.actions.setLogout(false);
      await AsyncStorage.clear();
    }
    return Promise.reject(err);
  },
);

export default axiosService;
