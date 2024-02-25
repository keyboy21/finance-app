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
import type { Expense } from '~/types/all.types';
import { ExpenseRow } from './ExpenseRow';
import { TableLoading } from './TableLoading';

export const ExpenseTable = () => {
	const { data, error } = useSWR<Expense[]>('/expenses', fetcher);

	if (error) return <section>Error fetching data</section>;
	if (!data) return <TableLoading />;

	const expenseSum = data.reduce(
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
						{data.map((expense) => (
							<ExpenseRow expense={expense} />
						))}
					</TableBody>
				</Table>
			</Card>
			<div className="flex justify-center mx-auto mt-10">
				<p className="text-tremor-metric text-tremor-content-strong flex items-center font-semibold">
					Вся сумма: {expenseSum} <DollarSign />
				</p>
			</div>
		</Container>
	);
};
