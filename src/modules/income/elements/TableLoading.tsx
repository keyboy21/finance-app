import { Container } from '~/components/ui/Container';
import { Skeleton } from '~/components/ui/Skeleton';

export const TableLoading = () => {
	return (
		<Container className="pt-10">
			<Skeleton className="w-full h-[100dvh] bg-slate-400 rounded-md" />
		</Container>
	);
};
