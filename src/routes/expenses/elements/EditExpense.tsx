import { Button, Select, SelectItem, Textarea } from '@tremor/react';
import { Save, SquarePen, XCircle } from 'lucide-react';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSWRConfig } from 'swr';
import { editExpense } from '~/api/expense/edit.expense.api';
import { Form } from '~/components/form/Form';
import { FormField } from '~/components/form/FormField';
import { Input } from '~/components/form/Input';
import { Label } from '~/components/form/Label';
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from '~/components/ui/Sheet';
import { useModal } from '~/hooks/useModal';
import { notify } from '~/libs/notify.lib';
import { Expense } from '~/types/all.types';
import { useRevalidator } from 'react-router-dom';

export const EditExpense: FC<EditExpenseProps> = ({ id, expense }) => {
	const { mutate } = useSWRConfig();
	const { close, open, visible } = useModal();
	const { revalidate } = useRevalidator();

	const { register, handleSubmit, control } = useForm<CreateExpenseForm>();

	const onSave = async (formData: CreateExpenseForm) => {
		const res = await editExpense(id, formData);
		if (res.data) {
			close();
			mutate('/expenses');
			notify('Расход успешно изменена', {
				type: 'success',
			});
			revalidate();
		} else {
			notify('Расход не изменена', {
				type: 'error',
			});
		}
	};

	return (
		<Sheet onClose={open} open={visible} modal>
			<Button onClick={open} icon={SquarePen} color="yellow">
				Редактировать
			</Button>
			<SheetContent onClose={close}>
				<SheetHeader>
					<SheetTitle>Редактировать Расход</SheetTitle>
				</SheetHeader>
				<div className="grid gap-4 py-4">
					<Form
						onSubmit={handleSubmit(onSave)}
						className="flex flex-col gap-y-3"
					>
						<FormField>
							<Label required>Имя</Label>
							<Input
								defaultValue={expense.name}
								placeholder="car"
								required
								{...register('name')}
							/>
						</FormField>
						<FormField>
							<Label required>Цена</Label>
							<Input
								defaultValue={expense.price}
								required
								placeholder="500"
								type="number"
								{...register('price')}
							/>
						</FormField>
						<FormField>
							<Label required>Категория</Label>
							<Controller
								control={control}
								name="category"
								defaultValue={expense.category}
								render={({ field: { onChange, value } }) => (
									<Select
										onValueChange={onChange}
										value={value}
										required
										defaultValue={expense.category}
									>
										<SelectItem value="home">Дом</SelectItem>
										<SelectItem value="childrens">Для детей</SelectItem>
										<SelectItem value="taxes">Налоги</SelectItem>
										<SelectItem value="medical">Для медицинского</SelectItem>
									</Select>
								)}
							/>
						</FormField>
						<FormField>
							<Label required>Note</Label>
							<Textarea
								className='h-24'
								defaultValue={expense.note}
								required
								placeholder="some note"
								{...register('note')}
							/>
						</FormField>
						<SheetFooter className="flex gap-3">
							<Button color="green" icon={Save} type="submit">
								Изменить
							</Button>
							<Button onClick={close} color="red" icon={XCircle}>
								Отмена
							</Button>
						</SheetFooter>
					</Form>
				</div>
			</SheetContent>
		</Sheet>
	);
};

export interface CreateExpenseForm {
	name: string;
	price: number;
	category: string;
	note: string;
}

type EditExpenseProps = {
	id: string;
	expense: Expense;
};
