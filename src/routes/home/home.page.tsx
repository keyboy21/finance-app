import { Container } from '~/components/ui/Container';
import { Heading } from '~/components/typography/Heading';
import useSWR from 'swr';
import { fetcher } from '~/api/fetchet';

export interface SelectTypeForm {
	type: string;
	amount: number;
	difficulty: string;
}

export const HomePage = () => {
	// const { register, handleSubmit, control } = useForm<SelectTypeForm>();

	// Step 2: Use the useSWR hook to fetch the data
	const { data, error } = useSWR('/expenses', fetcher);

	// Step 3: Handle loading and error states
	if (error) return <div>Error fetching data</div>;
	if (!data) return <div>Loading...</div>;

	console.log('asdasd', data);

	return (
		<section className="py-10">
			<Container className="space-y-5">
				<Heading className="text-center" level={1} as="h1">
					Главная страница
				</Heading>

				{/* <Form
					className="flex flex-col gap-y-5 mx-auto w-2/5"
					onSubmit={handleSubmit(startQuiz)}
				>
					<Input defaultValue={10} {...register("amount")} type="number" />
					<Controller
						control={control}
						name="type"
						defaultValue="multiple"
						render={({ field: { onChange, value } }) => (
							<Select onValueChange={onChange} value={value} name="type">
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Select type" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="multiple">Multiple</SelectItem>
									<SelectItem value="boolean">True / False</SelectItem>
								</SelectContent>
							</Select>
						)}
					/>
					<Controller
						control={control}
						name="difficulty"
						defaultValue="easy"
						render={({ field: { onChange, value } }) => (
							<Select
								defaultValue="easy"
								onValueChange={onChange}
								value={value}
								name="type"
							>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Select type" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="easy">Easy</SelectItem>
									<SelectItem value="medium">Medium</SelectItem>
									<SelectItem value="hard">Hard</SelectItem>
								</SelectContent>
							</Select>
						)}
					/>

					<Button className="w-full" type="submit">
						Start
					</Button>
				</Form> */}
			</Container>
		</section>
	);
};
