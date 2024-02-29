import { Heading } from '~/components/typography/Heading';
import { CreateIncome } from './elements/CreateIncome';
import { IncomeTable } from './elements/IncomeTable';

export const IncomeModule = () => {
	return (
		<section className="py-10">
			<div className="flex flex-col items-center gap-5">
				<Heading className="text-center" level={1} as="h1">
					Страница доходов
				</Heading>
				<CreateIncome />
			</div>
			<IncomeTable />
		</section>
	);
};
