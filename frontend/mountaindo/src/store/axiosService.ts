import axios from 'axios';
import Config from 'react-native-config';

const axiosService = axios.create({
  baseURL: Config.REACT_APP_BE_HOST,
  withCredentials: true,
});

export default axiosService;
