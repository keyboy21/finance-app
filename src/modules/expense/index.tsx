import { Heading } from '~/components/typography/Heading';
import { CreateExpense } from './elements/CreateExpense';
import { ExpenseTable } from './elements/ExpenseTable';

export const ExpenseModule = () => {
	return (
		<section className="py-10">
			<div className="flex flex-col items-center gap-5">
				<Heading className="text-center" level={1} as="h1">
					Страница расходов
				</Heading>
				<CreateExpense />
			</div>
			<ExpenseTable />
		</section>
	);
};
