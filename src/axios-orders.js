import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builer-86909-default-rtdb.firebaseio.com/'
});

export default instance;