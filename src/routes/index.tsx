import { createFileRoute } from '@tanstack/react-router';
import { HomeModule } from '~/modules/home';

// Note: If backend can sendig all expenses and
// incomes by date we can implement fetching by date, that user
// can see expenses by date
const HomePage = () => {
	return <HomeModule />;
};

export const Route = createFileRoute('/')({
	component: HomePage,
});

// interface queryParams {
// 	from: Date | undefined;
// 	to: Date | undefined;
// }
