import { Divider, DonutChart } from '@tremor/react';
import type { FC } from 'react';
import useSWR from 'swr';
import { fetcher } from '~/api/fetcher';
import { Heading } from '~/components/typography/Heading';
import type { Expense, Income } from '~/types/all.types';
import { CustomChart } from './CustomChart';
import { Loading } from './Loading';
import { useSearch } from '@tanstack/react-router';

export const DataVisualiton: FC = () => {
	// Note: If backend can sendig all expenses and
	// incomes by date we can implement fetching by date, that user
	// can see expenses by date
	const params = useSearch({ from: '/' });
	console.log('params', params);

	const { data: expense, error: expenseError } = useSWR<Expense[]>(
		'/expenses',
		fetcher,
	);
	const { data: income, error: incomeError } = useSWR<Income[]>(
		'/incomes',
		fetcher,
	);

	if (expenseError && incomeError) return <div>Error fetching data</div>;
	if (!expense || !income) return <Loading />;

	const expenseSum = expense.reduce(
		(accumulator, currentValue) => accumulator + +currentValue.price,
		0,
	);

	const incomesSum = income.reduce(
		(accumulator, currentValue) => accumulator + +currentValue.price,
		0,
	);

	const data = [
		{
			name: 'Расход',
			value: expenseSum,
		},
		{
			name: 'Доход',
			value: incomesSum,
		},
	];

	return (
		<>
			<div className="flex flex-col gap-5">
				<Heading className="text-center" level={3} as="h2">
					Обший доход и расход
				</Heading>
				<DonutChart data={data} variant="pie" />
			</div>
			<Divider />
			<div className="flex flex-col">
				<Heading className="text-center" level={3} as="h2">
					Обший доход и расход по датам
				</Heading>
				<CustomChart expense={expense} income={income} />
			</div>
		</>
	);
};
