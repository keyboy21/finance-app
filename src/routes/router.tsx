import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Loading } from '~/routes/home/elements/Loading';
const RootLayout = lazy(() => import('~/layouts/root.layout'));
const HomePage = lazy(() => import('~/routes/home/home.page'));
const ExpensesPage = lazy(() => import('~/routes/expenses/expenses.page'));
const IncomesPage = lazy(() => import('~/routes/incomes/incomes.page'));

export const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<Suspense fallback={<div>Идет загрузка ...</div>}>
				<RootLayout />
			</Suspense>
		),
		children: [
			{
				path: '/',
				element: (
					<Suspense fallback={<Loading />}>
						<HomePage />
					</Suspense>
				),
			},
		],
	},
	{
		path: '/expenses',
		element: (
			<Suspense fallback={<div>Идет загрузка ...</div>}>
				<RootLayout />
			</Suspense>
		),
		children: [
			{
				path: '/expenses',
				element: (
					<Suspense fallback={<Loading />}>
						<ExpensesPage />
					</Suspense>
				),
			},
		],
	},
	{
		path: '/incomes',
		element: (
			<Suspense fallback={<div>Идет загрузка ...</div>}>
				<RootLayout />
			</Suspense>
		),
		children: [
			{
				path: '/incomes',
				element: (
					<Suspense fallback={<Loading />}>
						<IncomesPage />,
					</Suspense>
				),
			},
		],
	},
]);
