import { useNavigate } from "react-router-dom";
import { Heading } from "~/components/typography/Heading";

export const ExpensesPage = () => {
	const navigate = useNavigate();

	return (
		<section className="py-10">
			<Heading className="text-center" level={1} as="h1">
				Страница расходов
			</Heading>
		</section>
	);
};
