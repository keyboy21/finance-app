import { Container } from '~/components/ui/Container';
import { Skeleton } from '~/components/ui/Skeleton';

const Loading = () => {
	return (
		<section className="py-10">
			<Skeleton className="w-96 h-10 bg-slate-400 mx-auto rounded-md" />
			<Container>
				<Skeleton className="w-full mt-10 h-[100dvh] bg-slate-400 rounded-md" />
			</Container>
		</section>
	);
};

export default Loading;