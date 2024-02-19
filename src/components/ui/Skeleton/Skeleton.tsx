import { cn } from '~/libs/cn.lib';

export const Skeleton = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => {
	return <div className={cn('bg-muted animate-pulse', className)} {...props} />;
};
