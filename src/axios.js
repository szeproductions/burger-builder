import axios from 'axios';

const axiosOrder = axios.create({
  baseURL: 'https://react-burger-builder-f617d.firebaseio.com/',
});

export {axiosOrder};
