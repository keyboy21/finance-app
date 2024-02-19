import axios from 'axios';
import { BASE_URL } from '~/config/env.config';

export const fetcher = (url: string) =>
	axios.get(`${BASE_URL}${url}`).then((res) => res.data);
