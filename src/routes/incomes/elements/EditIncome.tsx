import { Button, Select, SelectItem, Textarea } from '@tremor/react';
import { Save, SquarePen, XCircle } from 'lucide-react';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useRevalidator } from 'react-router-dom';
import { useSWRConfig } from 'swr';
import { editIncome } from '~/api/income/edit.income.api';
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
import { Income } from '~/types/all.types';

const EditIncome: FC<EditIncomeProps> = ({ id, income }) => {
	const { mutate } = useSWRConfig();
	const { close, open, visible } = useModal();
	const { revalidate } = useRevalidator();
	const { register, handleSubmit, control } = useForm<CreateIncomeForm>();

	const onSave = async (formData: CreateIncomeForm) => {
		const res = await editIncome(id, formData);
		if (res.data) {
			close();
			mutate('/incomes');
			notify('Доход успешно изменена', {
				type: 'success',
			});
			revalidate();
		} else {
			notify('Доход не изменена', {
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
					<SheetTitle>Редактировать Доход</SheetTitle>
				</SheetHeader>
				<div className="grid gap-4 py-4">
					<Form
						onSubmit={handleSubmit(onSave)}
						className="flex flex-col gap-y-3"
					>
						<FormField>
							<Label required>Имя</Label>
							<Input
								defaultValue={income.name}
								placeholder="car"
								required
								{...register('name')}
							/>
						</FormField>
						<FormField>
							<Label required>Цена</Label>
							<Input
								defaultValue={income.price}
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
								defaultValue={income.category}
								render={({ field: { onChange, value } }) => (
									<Select
										onValueChange={onChange}
										value={value}
										required
										defaultValue={income.category}
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
							<Label required>Заметка</Label>
							<Textarea
								className='h-24'
								defaultValue={income.note}
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

export default EditIncome;

export interface CreateIncomeForm {
	name: string;
	price: number;
	category: string;
	note: string;
}

type EditIncomeProps = {
	id: string;
	income: Income;
};
