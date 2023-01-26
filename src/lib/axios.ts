import axios from 'axios';

import { API_URL } from '@/config';

export const api = axios.create({
  baseURL: `${API_URL}/api`,
});
