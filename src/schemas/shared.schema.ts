import { z } from 'zod';

export const formSchema = z.object({
	name: z.string().trim().min(2, {
		message: 'name must be at least 2 characters.',
	}),
	price: z.coerce
		.number()
		.min(1, {
			message: 'price must be minimum 1',
		})
		.int(),
	category: z.string().trim().min(1, {
		message: 'select category',
	}),
	note: z.string().trim().min(2, {
		message: 'note must be at least 2 characters.',
	}),
});
