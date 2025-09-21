import { component$, type PropsOf, Slot } from '@builder.io/qwik';

import { cn } from '@/lib/cn';

export type ButtonVariant = 'contained' | 'outlined' | 'text';
export type ButtonSize = 'small' | 'medium' | 'large';

export type ButtonProps = PropsOf<'button'> & {
	variant?: ButtonVariant;
	size?: ButtonSize;
};

// Variant and size class mappings for better maintainability
const buttonVariants: Record<ButtonVariant, string> = {
	contained: 'btn-contained',
	outlined: 'btn-outlined',
	text: 'btn-text',
} as const;

const buttonSizes: Record<ButtonSize, string> = {
	small: 'btn-small',
	medium: 'btn-medium',
	large: 'btn-large',
} as const;

export const Button = component$<ButtonProps>(
	({
		type = 'button',
		variant = 'contained',
		size = 'medium',
		class: classes,
		...buttonProps
	}) => {
		const variantClass = buttonVariants[variant];
		const sizeClass = buttonSizes[size];

		return (
			<button
				{...buttonProps}
				class={cn('btn-base', variantClass, sizeClass, classes)}
				type={type}
			>
				<Slot />
			</button>
		);
	},
);
