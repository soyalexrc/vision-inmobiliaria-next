import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://100.42.69.119:3000/api'
})

export default axiosInstance
