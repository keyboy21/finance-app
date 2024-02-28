import { createFileRoute } from '@tanstack/react-router';
import { HomeModule } from '~/modules/home';

const HomePage = () => {
	return <HomeModule />;
};

export const Route = createFileRoute('/')({
	component: HomePage,
});
