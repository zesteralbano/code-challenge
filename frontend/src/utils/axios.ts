import axios from 'axios'

export const baseURL = process.env.REACT_APP_API_URL

const api = axios.create({
  baseURL,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api