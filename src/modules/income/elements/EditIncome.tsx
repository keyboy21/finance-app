import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from '@tanstack/react-router';
import { Button, Select, SelectItem, Textarea } from '@tremor/react';
import { Save, SquarePen, XCircle } from 'lucide-react';
import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useSWRConfig } from 'swr';
import { z } from 'zod';
import { editIncome } from '~/api/income/edit.income.api';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '~/components/form/Form';
import { Input } from '~/components/form/Input';
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from '~/components/ui/Sheet';
import { useModal } from '~/hooks/useModal';
import { notify } from '~/libs/notify.lib';
import { formSchema } from '~/schemas/shared.schema';
import { Income } from '~/types/all.types';

export const EditIncome: FC<EditIncomeProps> = ({ id, income }) => {
	const { mutate } = useSWRConfig();
	const { close, open, visible } = useModal();
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: income.name,
			price: +income.price,
			category: income.category,
			note: income.note,
		},
	});

	const onSave = async (formData: z.infer<typeof formSchema>) => {
		const res = await editIncome(id, formData);
		if (res.data) {
			close();
			mutate('/incomes');
			notify('Доход успешно изменена', {
				type: 'success',
			});
			router.preloadRoute({
				to: '/incomes',
			});
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
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSave)}
							className="flex flex-col gap-y-3"
						>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel required>Имя</FormLabel>
										<FormControl>
											<Input
												defaultValue={income.name}
												placeholder="car"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="price"
								render={({ field }) => (
									<FormItem>
										<FormLabel required>Цена</FormLabel>
										<FormControl>
											<Input
												defaultValue={income.price}
												placeholder="500"
												type="number"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="category"
								render={({ field }) => (
									<FormItem>
										<FormLabel required>Категория</FormLabel>
										<FormControl>
											<Select
												onValueChange={field.onChange}
												value={field.value}
												defaultValue={income.category}
											>
												<SelectItem value="home">Дом</SelectItem>
												<SelectItem value="childrens">Для детей</SelectItem>
												<SelectItem value="taxes">Налоги</SelectItem>
												<SelectItem value="medical">
													Для медицинского
												</SelectItem>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="note"
								render={({ field }) => (
									<FormItem>
										<FormLabel required>Note</FormLabel>
										<FormControl>
											<Textarea
												className="h-24"
												defaultValue={income.note}
												placeholder="some note"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<SheetFooter className="flex gap-3">
								<Button color="green" icon={Save} type="submit">
									Изменить
								</Button>
								<Button onClick={close} color="red" icon={XCircle}>
									Отмена
								</Button>
							</SheetFooter>
						</form>
					</Form>
				</div>
			</SheetContent>
		</Sheet>
	);
};

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
