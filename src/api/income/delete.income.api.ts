import { BASE_URL } from '~/config/env.config';
import axios from 'axios';

export const deleteIncome = async (id: string) => {
	const { data, status } = await axios.delete(`${BASE_URL}/incomes/${id}`);
	return { data, status };
};
