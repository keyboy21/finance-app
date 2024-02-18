import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "~/layouts";
import { HomePage } from "~/routes/home";
import { IncomePage } from "~/routes/incomes";
import { ExpensesPage } from "./expenses";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		children: [
			{
				path: "/",
				element: <HomePage />,
			},
		],
	},

	{
		path: "/expenses",
		element: <RootLayout />,
		children: [
			{
				path: "/expenses",
				element: <ExpensesPage />,
			},
		],
	},
	{
		path: "/incomes",
		element: <RootLayout />,
		children: [
			{
				path: "/incomes",
				element: <IncomePage />,
			},
		],
	},
]);
