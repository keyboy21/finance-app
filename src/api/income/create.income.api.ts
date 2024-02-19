import { BASE_URL } from '~/config/env.config';
import axios from 'axios';

export interface CreateIncome {
	name: string;
	price: number;
	category: string;
	note: string;
}

export const createIncome = async (incomeData: CreateIncome) => {
	const { data, status } = await axios.post(`${BASE_URL}/incomes`, {
		name: incomeData.name,
		price: incomeData.price,
		category: incomeData.category,
		note: incomeData.note,
	});
	return { data, status };
};
