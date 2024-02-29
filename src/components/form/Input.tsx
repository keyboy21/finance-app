import * as React from 'react';
import { cn } from '~/libs/cn.lib';

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, ...props }, ref) => {
		return (
			<input
				className={cn(
					'flex h-10 w-full rounded-md border border-gray-200 bg-transparent px-3 py-2 text-sm ring-offset-gray-200 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
					className,
				)}
				{...props}
				ref={ref}
			/>
		);
	},
);

Input.displayName = 'Input';
