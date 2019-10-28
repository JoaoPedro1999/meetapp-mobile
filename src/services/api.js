import axios from 'axios';

const api = axios.create({
  baseURL: 'http://104.154.247.88',
});

export default api;
