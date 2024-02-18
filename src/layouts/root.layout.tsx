import { BarChart4, TrendingDown, TrendingUp } from "lucide-react";
import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";
import { Container } from "~/components/ui/Container";
export const RootLayout = () => {
	return (
		<Fragment>
			<header className="sticky top-0 z-10 border-b bg-white py-4">
				<Container className="flex items-center justify-between">
					<Link to={"/"} className="flex flex-row items-center gap-x-2">
						<BarChart4 className="h-7 w-7" />
						<span className="hidden font-bold sm:inline-block">Главная</span>
					</Link>
					<Link to={"/expenses"} className="flex flex-row items-center gap-x-2">
						<TrendingDown className="h-7 w-7" />
						<span className="hidden font-bold sm:inline-block">Расходы </span>
					</Link>
					<Link to={"/incomes"} className="flex flex-row items-center gap-x-2">
						<TrendingUp className="h-7 w-7" />
						<span className="hidden font-bold sm:inline-block">Доходы</span>
					</Link>
				</Container>
			</header>
			<Outlet />
		</Fragment>
	);
};
