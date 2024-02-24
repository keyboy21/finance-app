import { AreaChart } from '@tremor/react';
import type { FC } from 'react';
import { time } from '~/libs/time.lib';
import { Expense, Income } from '~/types/all.types';

export const CustomAreaChart: FC<AreaChatProps> = ({ expense, income }) => {
	const valueFormatter = (number: number) =>
		`$ ${new Intl.NumberFormat('en').format(number).toString()}`;

	const areaData: AreaChartData = expense.map((ex) => {
		const incomePrice =
			income.find(
				(inc) =>
					time(inc.createdAt).format('MMM') ===
					time(ex.createdAt).format('MMM'),
			)?.price ?? 0;
		return {
			Расход: +ex.price,
			Доход: +incomePrice,
			date: time(ex.createdAt).format('MMM'),
		};
	});
	return (
		<AreaChart
			className="h-80"
			data={areaData}
			index="date"
			categories={['Расход', 'Доход']}
			colors={['indigo', 'rose']}
			yAxisWidth={60}
			valueFormatter={valueFormatter}
		/>
	);
};

type AreaChatProps = {
	expense: Expense[];
	income: Income[];
};

type AreaChartData = {
	date: string;
	Расход: number;
	Доход: number;
}[];
