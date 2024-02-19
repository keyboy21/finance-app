import { BASE_URL } from '~/config/env.config';
import axios from 'axios';

export interface EditExpense {
	name: string;
	price: number;
	category: string;
	note: string;
}

export const editExpense = async (id: string, expenseData: EditExpense) => {
	const { data, status } = await axios.put(`${BASE_URL}/expenses/${id}`, {
		name: expenseData.name,
		price: expenseData.price,
		category: expenseData.category,
		note: expenseData.note,
	});
	return { data, status };
};
