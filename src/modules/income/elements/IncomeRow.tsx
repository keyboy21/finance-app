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
import { deleteIncome } from '~/api/income/delete.income.api';
import { Heading } from '~/components/typography/Heading';
import { Text } from '~/components/typography/Text';
import { notify } from '~/libs/notify.lib';
import { time } from '~/libs/time.lib';
import { Income } from '~/types/all.types';
import { EditIncome } from './EditIncome';
import { useRouter } from '@tanstack/react-router';

export const IncomeRow: FC<IncomeRowProps> = ({ income }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isDeleteOpen, setDeleteIsOpen] = useState(false);
	const router = useRouter();
	const { mutate } = useSWRConfig();

	const onDelete = async (id: string) => {
		setDeleteIsOpen(false);
		const res = await deleteIncome(id);
		if (res.data) {
			mutate('/incomes');
			notify('Доход успешно удалень', {
				type: 'success',
			});
			router.preloadRoute({
				to: '/incomes',
			});
		} else {
			notify('Доход не удалень', {
				type: 'error',
			});
		}
	};

	return (
		<>
			<TableRow className="gap-5 *:text-black" key={income.id}>
				<TableCell className="w-5 ">{income.id}</TableCell>
				<TableCell>{income.name}</TableCell>
				<TableCell>{income.price} $</TableCell>
				<TableCell className="w-5">{income.category}</TableCell>
				<TableCell className="w-5">
					{time(income.createdAt).format('DD-MM-YYYY')}
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
								Примечание к доходам
							</Heading>
							<Text className="mt-2 text-center">{income.note}</Text>
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
						<EditIncome id={income.id} income={income} />
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
									onClick={() => onDelete(income.id)}
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

type IncomeRowProps = {
	income: Income;
};
