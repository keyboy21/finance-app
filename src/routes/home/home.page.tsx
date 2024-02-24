import { Divider, DonutChart } from '@tremor/react';
import useSWR from 'swr';
import { fetcher } from '~/api/fetcher';
import { Heading } from '~/components/typography/Heading';
import { Container } from '~/components/ui/Container';
import type { Expense, Income } from '~/types/all.types';
import { CustomAreaChart } from './elements/AreaChat';
import { DateSelect } from './elements/DateSelect';
import { Loading } from './elements/Loading';
// import { useLocation } from 'react-router-dom';

// Note: If backend can sendig all expenses and
// incomes by date we can implement fetching by date, that user
// can see expenses by date

const HomePage = () => {
	// const location = useLocation();
	// const { from, to } = location.state as queryParams;

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
		<section className="py-10">
			<Container className="space-y-5">
				<Heading className="text-center" level={1} as="h1">
					Главная страница
				</Heading>
				<div className="flex w-fit mx-auto gap-5">
					<DateSelect />
				</div>
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
					<CustomAreaChart expense={expense} income={income} />
				</div>
			</Container>
		</section>
	);
};

export default HomePage;

// interface queryParams {
// 	from: Date | undefined;
// 	to: Date | undefined;
// }
