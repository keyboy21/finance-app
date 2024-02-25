import {
	Card,
	Table,
	TableBody,
	TableHead,
	TableHeaderCell,
	TableRow,
} from '@tremor/react';
import { DollarSign } from 'lucide-react';
import useSWR from 'swr';
import { fetcher } from '~/api/fetcher';
import { Container } from '~/components/ui/Container';
import { Income } from '~/types/all.types';
import { TableLoading } from './TableLoading';
import { IncomeRow } from './IncomeRow';

export const IncomeTable = () => {
	const { data, error } = useSWR<Income[]>('/incomes', fetcher);

	if (error) return <section>Error fetching data</section>;
	if (!data) return <TableLoading />;

	const incomesSum = data.reduce(
		(accumulator, currentValue) => accumulator + +currentValue.price,
		0,
	);
	return (
		<Container className="pt-10">
			<Card>
				<Table className="mt-5">
					<TableHead>
						<TableRow>
							<TableHeaderCell>#</TableHeaderCell>
							<TableHeaderCell>Имя</TableHeaderCell>
							<TableHeaderCell>Цена</TableHeaderCell>
							<TableHeaderCell>Категория</TableHeaderCell>
							<TableHeaderCell>Дата</TableHeaderCell>
							<TableHeaderCell>Заметка</TableHeaderCell>
							<TableHeaderCell>Действие</TableHeaderCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map((income) => (
							<IncomeRow income={income} />
						))}
					</TableBody>
				</Table>
			</Card>
			<div className="flex justify-center mx-auto mt-10">
				<p className="text-tremor-metric text-tremor-content-strong flex items-center font-semibold">
					Вся сумма: {incomesSum} <DollarSign />
				</p>
			</div>
		</Container>
	);
};
