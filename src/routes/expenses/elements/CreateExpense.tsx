import { Button, Select, SelectItem, Textarea } from '@tremor/react';
import { BadgePlus, Save, XCircle } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { useSWRConfig } from 'swr';
import { createExpense } from '~/api/expense/create.expense.api';
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

const CreateExpense = () => {
	const { mutate } = useSWRConfig();
	const { close, open, visible } = useModal();

	const { register, handleSubmit, control, reset } =
		useForm<CreateExpenseForm>();

	const onSave = async (formData: CreateExpenseForm) => {
		close();
		reset();
		const res = await createExpense(formData);
		if (res.data) {
			mutate('/expenses');
			notify('Расход успешно создан', {
				type: 'success',
			});
		} else {
			notify('Расход не создан', {
				type: 'error',
			});
		}
	};

	return (
		<Sheet onClose={open} open={visible} modal>
			<Button onClick={open} className="w-fit" icon={BadgePlus} color="green">
				Создать новый расход
			</Button>
			<SheetContent onClose={close}>
				<SheetHeader>
					<SheetTitle>Создать новый расход</SheetTitle>
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
										defaultValue="home"
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
								required
								placeholder="some note"
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

export default CreateExpense;

export interface CreateExpenseForm {
	name: string;
	price: number;
	category: string;
	note: string;
}
