import { Button, DateRangePicker } from '@tremor/react';
import { Controller, useForm } from 'react-hook-form';
import { Form } from '~/components/form/Form';
import { FormField } from '~/components/form/FormField';
import { useNavigate } from '@tanstack/react-router';

export const DateSelect = () => {
	const navigate = useNavigate();

	const { register, handleSubmit, control } = useForm<getExpensesForm>({
		defaultValues: {
			date: {
				to: new Date(),
			},
		},
	});

	const getExpenses = (formData: getExpensesForm) => {
		const { from, to } = formData.date ?? {};

		let endDate = to;
		if (from && !to) {
			endDate = new Date();
		}
		navigate({
			to: '/',
			replace: true,
			params: {
				from: from,
				to: endDate,
			},
		});
	};

	return (
		<Form onSubmit={handleSubmit(getExpenses)}>
			<FormField>
				<Controller
					control={control}
					name="date"
					render={({ field: { onChange, value } }) => (
						<DateRangePicker
							onValueChange={onChange}
							value={value}
							{...register('date')}
							placeholder="Выберите дату"
							enableSelect={false}
							className="mx-auto max-w-sm"
						/>
					)}
				/>
				<Button color="lime" type="submit">
					Показат
				</Button>
			</FormField>
		</Form>
	);
};

interface getExpensesForm {
	date: {
		from?: Date;
		to?: Date;
	};
}
