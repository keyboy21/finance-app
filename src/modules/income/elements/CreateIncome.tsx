import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from '@tanstack/react-router';
import { Button, Select, SelectItem, Textarea } from '@tremor/react';
import { BadgePlus, Save, XCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useSWRConfig } from 'swr';
import { z } from 'zod';
import { createIncome } from '~/api/income/create.income.api';
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

export const CreateIncome = () => {
	const { mutate } = useSWRConfig();
	const { close, open, visible } = useModal();
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			price: 0,
			category: '',
			note: '',
		},
	});

	const onSave = async (formData: z.infer<typeof formSchema>) => {
		close();
		form.reset();
		const res = await createIncome(formData);
		if (res.data) {
			mutate('/incomes');
			notify('Доход успешно создан', {
				type: 'success',
			});
			router.preloadRoute({
				to: '/incomes',
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
											<Input placeholder="car" {...field} />
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
											<Input placeholder="500" type="number" {...field} />
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
												{...field}
												onValueChange={field.onChange}
												value={field.value}
											>
												<SelectItem value="salary">Зарплата</SelectItem>
												<SelectItem value="dividentы">Дивиденды</SelectItem>
												<SelectItem value="stock">Акции</SelectItem>
												<SelectItem value="royalties">Гонорары </SelectItem>
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
										<FormLabel required>Заметка</FormLabel>
										<FormControl>
											<Textarea
												className="h-24"
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
									Создать
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
