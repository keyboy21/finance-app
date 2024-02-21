import {
	Button,
	Dialog,
	DialogPanel,
	TableCell,
	TableRow,
} from '@tremor/react';
import { NotebookText, Trash2, XCircle } from 'lucide-react';
import { FC, useState } from 'react';
import { useSWRConfig } from 'swr';
import { deleteExpense } from '~/api/expense/delete.expense.api';
import { Heading } from '~/components/typography/Heading';
import { Text } from '~/components/typography/Text';
import { notify } from '~/libs/notify.lib';
import { time } from '~/libs/time.lib';
import { Expense } from '~/types/all.types';
import { EditExpense } from './EditExpense';

export const ExpenseRow: FC<ExpenseRowProps> = ({ expense }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isDeleteOpen, setDeleteIsOpen] = useState(false);

	const { mutate } = useSWRConfig();

	const onDelete = async (id: string) => {
		setDeleteIsOpen(false);
		const res = await deleteExpense(id);
		if (res.data) {
			mutate('/expenses');
			notify('Расход успешно удалень', {
				type: 'success',
			});
		} else {
			notify('Расход не удалень', {
				type: 'error',
			});
		}
	};

	return (
		<>
			<TableRow className="gap-5 *:text-black" key={expense.id}>
				<TableCell className="w-5 ">{expense.id}</TableCell>
				<TableCell>{expense.name}</TableCell>
				<TableCell>{expense.price} $</TableCell>
				<TableCell className="w-5">{expense.category}</TableCell>
				<TableCell className="w-5">
					{time(expense.createdAt).format('DD-MM-YYYY')}
				</TableCell>
				<TableCell className="w-5">
					<Button
						icon={NotebookText}
						onClick={() => setIsOpen(true)}
						color="blue"
					>
						Заметки
					</Button>
					<Dialog open={isOpen} onClose={(val) => setIsOpen(val)} static={true}>
						<DialogPanel>
							<Heading className="text-lg font-semibold text-tremor-content-strong text-center">
								Примечание к расходам
							</Heading>
							<Text className="mt-2 text-center">{expense.note}</Text>
						</DialogPanel>
					</Dialog>
				</TableCell>
				<TableCell className="max-w-12">
					<div className="flex gap-5">
						<Button
							onClick={() => setDeleteIsOpen(true)}
							icon={Trash2}
							color="red"
						>
							Удалить
						</Button>
						<EditExpense id={expense.id} expense={expense} />
					</div>
					<Dialog
						open={isDeleteOpen}
						onClose={(val) => setDeleteIsOpen(val)}
						static={true}
					>
						<DialogPanel>
							<h3 className="text-lg font-semibold text-tremor-content-strong text-center">
								Вы действительно хотите удалить?
							</h3>
							<div className="flex justify-evenly">
								<Button
									color="neutral"
									icon={XCircle}
									className="mt-8"
									onClick={() => setDeleteIsOpen(false)}
								>
									Отмена
								</Button>
								<Button
									icon={Trash2}
									color="red"
									className="mt-8"
									onClick={() => onDelete(expense.id)}
								>
									Удалить
								</Button>
							</div>
						</DialogPanel>
					</Dialog>
				</TableCell>
			</TableRow>
		</>
	);
};

export default ExpenseRow;

type ExpenseRowProps = {
	expense: Expense;
};
