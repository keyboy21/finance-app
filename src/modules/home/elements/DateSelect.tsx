import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { Button, DateRangePicker } from '@tremor/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormField } from '~/components/form/Form';

export const DateSelect = () => {
	const navigate = useNavigate({ from: '/' });

	const dateSchema = z.object({
		date: z.object({
			from: z.date().optional(),
			to: z.date(),
		}),
	});

	const form = useForm<z.infer<typeof dateSchema>>({
		resolver: zodResolver(dateSchema),
		defaultValues: {
			date: {
				to: new Date(),
			},
		},
	});

	const getExpenses = (formData: z.infer<typeof dateSchema>) => {
		const { from, to } = formData.date;
		navigate({
			to: '/',
			replace: true,
			search: {
				from: from,
				to: to,
			},
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(getExpenses)} className="space-y-5">
				<FormField
					control={form.control}
					name="date"
					render={({ field }) => (
						<DateRangePicker
							onValueChange={field.onChange}
							value={field.value}
							placeholder="Выберите дату"
							enableSelect={false}
							className="mx-auto max-w-sm"
						/>
					)}
				/>
				<Button color="lime" type="submit" className="w-full">
					Показат
				</Button>
			</form>
		</Form>
	);
};
