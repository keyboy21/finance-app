import { createFileRoute } from '@tanstack/react-router';
import { IncomeModule } from '~/modules/income';

const IncomesPage = () => {
	return <IncomeModule />;
};

export const Route = createFileRoute('/incomes/')({
	component: IncomesPage,
});
