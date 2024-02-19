import { BarChart4, TrendingDown, TrendingUp } from 'lucide-react';
import { Fragment } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Container } from '~/components/ui/Container';
import { useLocation } from 'react-router-dom';
import { cn } from '~/libs/cn.lib';

export const RootLayout = () => {
	const location = useLocation();
	return (
		<Fragment>
			<header className="sticky top-0 z-10 border-b bg-white py-4">
				<Container className="flex items-center justify-between">
					<Link
						to={'/'}
						className={cn('flex flex-row items-center gap-x-2 p-3', {
							'text-blue-600 shadow-md rounded-md': location.pathname === '/',
						})}
					>
						<BarChart4 className="h-7 w-7" />
						<span className="hidden font-bold sm:inline-block">Главная</span>
					</Link>
					<Link
						to={'/expenses'}
						className={cn('flex flex-row items-center gap-x-2 p-3', {
							'text-red-600 shadow-md rounded-md':
								location.pathname === '/expenses',
						})}
					>
						<TrendingDown className="h-7 w-7" />
						<span className={'hidden font-bold sm:inline-block'}>Расходы</span>
					</Link>
					<Link
						to={'/incomes'}
						className={cn('flex flex-row items-center gap-x-2 p-3', {
							'text-green-600 shadow-md rounded-md':
								location.pathname === '/incomes',
						})}
					>
						<TrendingUp className="h-7 w-7" />
						<span className="hidden font-bold sm:inline-block">Доходы</span>
					</Link>
				</Container>
			</header>
			<Outlet />
			<Toaster />
		</Fragment>
	);
};
