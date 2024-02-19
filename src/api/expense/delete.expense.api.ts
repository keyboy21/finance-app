import { BASE_URL } from '~/config/env.config';
import axios from 'axios';

export const deleteExpense = async (id: string) => {
	const { data, status } = await axios.delete(`${BASE_URL}/expenses/${id}`);
	return { data, status };
};
