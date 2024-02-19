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
import { fetcher } from '~/api/fetchet';
import { Heading } from '~/components/typography/Heading';
import { Container } from '~/components/ui/Container';
import { Expense } from '~/types/all.types';
import CreateExpense from './elements/CreateExpense';
import Loading from './elements/Loading';
import Tablerow from './elements/ExpenseRow';

export const ExpensesPage = () => {
	const { data, error } = useSWR<Expense[]>('/expenses', fetcher);

	if (error) return <section>Error fetching data</section>;
	if (!data) return <Loading />;

	const expenseSum = data.reduce(
		(accumulator, currentValue) => accumulator + +currentValue.price,
		0,
	);

	return (
		<section className="py-10">
			<div className="flex flex-col items-center gap-5">
				<Heading className="text-center" level={1} as="h1">
					Страница расходов
				</Heading>
				<CreateExpense />
			</div>
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
								<Tablerow expense={expense} />
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
		</section>
	);
};
