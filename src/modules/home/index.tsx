import type { FC } from 'react';
import { Heading } from '~/components/typography/Heading';
import { Container } from '~/components/ui/Container';
import { DateSelect } from './elements/DateSelect';
import { DataVisualiton } from './elements/DataVisualiton';

export const HomeModule: FC = () => {
	return (
		<section className="py-10">
			<Container className="space-y-5">
				<Heading className="text-center" level={1} as="h1">
					Главная страница
				</Heading>
				<div className="flex w-fit mx-auto gap-5">
					<DateSelect />
				</div>
				<DataVisualiton />
			</Container>
		</section>
	);
};
