import { Button, Select, SelectItem } from '@tremor/react';
import { BadgePlus, Save, XCircle } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { useSWRConfig } from 'swr';
import { createIncome } from '~/api/income/create.income.api';
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

const CreateIncome = () => {
	const { mutate } = useSWRConfig();
	const { close, open, visible } = useModal();

	const { register, handleSubmit, control, reset } =
		useForm<CreateIncomeForm>();

	const onSave = async (formData: CreateIncomeForm) => {
		close();
		reset();
		const res = await createIncome(formData);
		if (res.data) {
			mutate('/incomes');
			notify('Доход успешно создан', {
				type: 'success',
			});
		} else {
			notify('Доход не создан', {
				type: 'error',
			});
		}
	};

	return (
		<Sheet onClose={open} open={visible} modal>
			<Button onClick={open} className="w-fit" icon={BadgePlus} color="green">
				Создать новый доход
			</Button>
			<SheetContent onClose={close}>
				<SheetHeader>
					<SheetTitle>Создать новый доход</SheetTitle>
				</SheetHeader>
				<div className="grid gap-4 py-4">
					<Form
						onSubmit={handleSubmit(onSave)}
						className="flex flex-col gap-y-3"
					>
						<FormField>
							<Label required>Имя</Label>
							<Input placeholder="car" required {...register('name')} />
						</FormField>
						<FormField>
							<Label required>Цена</Label>
							<Input
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
								defaultValue="asd"
								render={({ field: { onChange, value } }) => (
									<Select
										onValueChange={onChange}
										value={value}
										required
										defaultValue="salary"
									>
										<SelectItem value="salary">Зарплата</SelectItem>
										<SelectItem value="dividentы">Дивиденды</SelectItem>
										<SelectItem value="stock">Акции</SelectItem>
										<SelectItem value="royalties">Гонорары </SelectItem>
									</Select>
								)}
							/>
						</FormField>
						<FormField>
							<Label required>Заметка</Label>
							<Input
								required
								placeholder="some note"
								type="text"
								{...register('note')}
							/>
						</FormField>
						<SheetFooter className="flex gap-3">
							<Button color="green" icon={Save} type="submit">
								Создать
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

export default CreateIncome;

export interface CreateIncomeForm {
	name: string;
	price: number;
	category: string;
	note: string;
}
