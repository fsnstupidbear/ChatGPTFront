import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost',
  timeout: 3000,
});

export default instance;
