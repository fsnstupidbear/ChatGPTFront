import axios from 'axios'

const instance = axios.create({
  //部署时：http://fsnteam.com:8080
  //本地：http://localhost:8080
  //华沙服务器：http://94.156.99.10:8080
  baseURL: 'http://localhost:8080',
  timeout: 50000,
});

export default instance;
