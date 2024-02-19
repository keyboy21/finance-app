import { BASE_URL } from '~/config/env.config';
import axios from 'axios';

export interface CreateExpense {
	name: string;
	price: number;
	category: string;
	note: string;
}

export const createExpense = async (expenseData: CreateExpense) => {
	const { data, status } = await axios.post(`${BASE_URL}/expenses`, {
		name: expenseData.name,
		price: expenseData.price,
		category: expenseData.category,
		note: expenseData.note,
	});
	return { data, status };
};
