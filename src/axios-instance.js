import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://api.project.com:3000'
});

export default instance;