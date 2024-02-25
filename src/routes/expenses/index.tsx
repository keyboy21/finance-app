import { createFileRoute } from '@tanstack/react-router';
import { ExpenseModule } from '~/modules/expense';

const ExpensesPage = () => {
	return <ExpenseModule />;
};

export const Route = createFileRoute('/expenses/')({
	component: ExpensesPage,
});
