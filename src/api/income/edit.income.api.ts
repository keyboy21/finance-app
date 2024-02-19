import { BASE_URL } from '~/config/env.config';
import axios from 'axios';

export interface EditIncome {
	name: string;
	price: number;
	category: string;
	note: string;
}

export const editIncome = async (id: string, incomeData: EditIncome) => {
	const { data, status } = await axios.put(`${BASE_URL}/incomes/${id}`, {
		name: incomeData.name,
		price: incomeData.price,
		category: incomeData.category,
		note: incomeData.note,
	});
	return { data, status };
};
