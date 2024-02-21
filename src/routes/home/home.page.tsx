import { AreaChart, Divider, DonutChart } from '@tremor/react';
import useSWR from 'swr';
import { fetcher } from '~/api/fetcher';
import { Heading } from '~/components/typography/Heading';
import { Container } from '~/components/ui/Container';
import type { Expense, Income } from '~/types/all.types';
import { DateSelect } from './elements/DateSelect';
import { Loading } from './elements/Loading';
// import { useLocation } from 'react-router-dom';

// Note: If backend can sendig all expenses and
// incomes by date we can implement fetching by date, that user
// can see expenses by date

// My fake backend cannot send expense and income by month,
// that is why I implemen static data
const chartdata = [
	{
		date: 'Jan 22',
		Расход: 2890,
		Доход: 2338,
	},
	{
		date: 'Feb 22',
		Расход: 2756,
		Доход: 2103,
	},
	{
		date: 'Mar 22',
		Расход: 3322,
		Доход: 2194,
	},
	{
		date: 'Apr 22',
		Расход: 3470,
		Доход: 2108,
	},
	{
		date: 'May 22',
		Расход: 3475,
		Доход: 1812,
	},
	{
		date: 'Jun 22',
		Расход: 3129,
		Доход: 1726,
	},
	{
		date: 'Jul 22',
		Расход: 3490,
		Доход: 1982,
	},
	{
		date: 'Aug 22',
		Расход: 2903,
		Доход: 2012,
	},
	{
		date: 'Sep 22',
		Расход: 2643,
		Доход: 2342,
	},
	{
		date: 'Oct 22',
		Расход: 2837,
		Доход: 2473,
	},
	{
		date: 'Nov 22',
		Расход: 2954,
		Доход: 3848,
	},
	{
		date: 'Dec 22',
		Расход: 3239,
		Доход: 3736,
	},
];

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
	if (!expense && !income) return <Loading />;

	const expenseSum =
		expense?.reduce(
			(accumulator, currentValue) => accumulator + +currentValue.price,
			0,
		) ?? 0;

	const incomesSum =
		income?.reduce(
			(accumulator, currentValue) => accumulator + +currentValue.price,
			0,
		) ?? 0;

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
					<AreaChart
						className="h-80"
						data={chartdata}
						index="date"
						categories={['Расход', 'Доход']}
						colors={['indigo', 'rose']}
						yAxisWidth={60}
						onValueChange={(v) => console.log(v)}
					/>
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
