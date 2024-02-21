import type {
	ComponentPropsWithoutRef,
	ElementRef,
	FC,
	ReactNode,
} from 'react';
import { forwardRef } from 'react';
import {
	Close,
	Content,
	Description,
	Overlay,
	Portal,
	Root,
	Title,
	Trigger,
} from '@radix-ui/react-dialog';

import { Heading } from '~/components/typography/Heading';
import { cn } from '~/libs/cn.lib';
import { XCircle } from 'lucide-react';

/**
 * Props for the Sheet component.
 */
interface SheetProps {
	/**
	 * The content of the sheet.
	 */
	children: ReactNode;
	/**
	 * Whether the sheet is open or not.
	 */
	open?: boolean;
	/**
	 * Whether the sheet is open by default or not.
	 */
	defaultOpen?: boolean;
	/**
	 * Whether the sheet is a modal or not.
	 */
	modal?: boolean;
	/**
	 * Function to be called when the sheet is opened.
	 */
	onOpen?: () => void;
	/**
	 * Function to be called when the sheet is closed.
	 */
	onClose?: () => void;
}

/**
 * Sheet component that renders a dialog sheet.
 * @param props - The props of the Sheet component.
 * @param props.children - The content of the sheet.
 * @param props.open - Whether the sheet is open or not.
 * @param props.defaultOpen - Whether the sheet is open by default or not.
 * @param props.modal - Whether the sheet is a modal or not.
 * @param props.onOpen - Function to be called when the sheet is opened.
 * @param props.onClose - Function to be called when the sheet is closed.
 * @returns - The Sheet component.
 */
export const Sheet: FC<SheetProps> = ({
	onOpen,
	onClose,
	children,
	...props
}) => {
	function onOpenChange(open: boolean) {
		if (open) {
			onOpen?.();
		} else {
			onClose?.();
		}
	}

	return (
		<Root onOpenChange={onOpenChange} {...props}>
			{children}
		</Root>
	);
};
Sheet.displayName = 'Sheet';
export const SheetTrigger = Trigger;
SheetTrigger.displayName = 'SheetTrigger';

// Sheet Close
type SheetCloseRef = ElementRef<typeof Close>;
type SheetCloseProps = ComponentPropsWithoutRef<typeof Close>;
export const SheetClose = forwardRef<SheetCloseRef, SheetCloseProps>(
	({ className, children, ...props }, ref) => {
		return (
			<Close className={cn(className)} {...props} ref={ref}>
				{children}
			</Close>
		);
	},
);
SheetClose.displayName = 'SheetClose';

// Sheet Portal
type SheetPortalProps = ComponentPropsWithoutRef<typeof Portal> & {
	shouldPortal?: boolean;
};
const SheetPortal: FC<SheetPortalProps> = ({
	children,
	shouldPortal,
	...props
}) => {
	if (shouldPortal === false) {
		return <>{children}</>;
	}

	return <Portal {...props}>{children}</Portal>;
};
SheetPortal.displayName = 'SheetPortal';

// Sheet Overlay
type SheetOverlayRef = ElementRef<typeof Overlay>;
type SheetOverlayProps = ComponentPropsWithoutRef<typeof Overlay>;
const SheetOverlay = forwardRef<SheetOverlayRef, SheetOverlayProps>(
	({ className, ...props }, ref) => {
		return (
			<Overlay
				className={cn(
					'fixed inset-0 z-50 backdrop-blur-md',
					'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
					className,
				)}
				{...props}
				ref={ref}
			/>
		);
	},
);
SheetOverlay.displayName = 'SheetOverlay';

// Sheet Content
type SheetContentRef = ElementRef<typeof Content>;
type SheetContentProps = ComponentPropsWithoutRef<typeof Content> & {
	/** The side of the sheet. Defaults to `right`. */
	side?: 'left' | 'right';
	/** Whether the sheet should be rendered in a portal or not. Defaults to `true`. */
	shouldPortal?: boolean;
	/** Whether the sheet should be focus locked on open or not. Defaults to `false`. */
	focusLock?: boolean;
	/** Whether the sheet should be closed on escape key down or not. Defaults to `true`. */
	closeOnEscape?: boolean;
	/** Whether the sheet should be closed on outside interaction or not. Defaults to `true`. */
	closeOnOutside?: boolean;
	/** Props for the `SheetPortal` component. */
	portalProps?: ComponentPropsWithoutRef<typeof SheetPortal>;
	/** Props for the `SheetOverlay` component. */
	overlayProps?: ComponentPropsWithoutRef<typeof SheetOverlay>;
	/** Whether the sheet should have a close button or not. Defaults to `true`. If `true` the `onClose` prop is required. */
	hasCloseButton?: boolean;
	/** Callback that is fired when the sheet is closed. */
	onClose?: () => void;
};
type PointerDownOutsideEvent = CustomEvent<{
	originalEvent: PointerEvent;
}>;
type FocusOutsideEvent = CustomEvent<{
	originalEvent: FocusEvent;
}>;

export const SheetContent = forwardRef<SheetContentRef, SheetContentProps>(
	(
		{
			className,
			side = 'right',
			focusLock = false,
			shouldPortal = true,
			closeOnEscape = true,
			closeOnOutside = true,
			hasCloseButton = true,
			onClose,
			portalProps,
			overlayProps,
			children,
			...props
		},
		ref,
	) => {
		function onOpenAutoFocus(e: Event) {
			if (focusLock === false) {
				e.preventDefault();
			}
		}

		function onEscapeKeyDown(e: KeyboardEvent) {
			if (closeOnEscape === true) {
				e.preventDefault();
			}
		}

		function onInteractOutside(e: PointerDownOutsideEvent | FocusOutsideEvent) {
			if (closeOnOutside === false) {
				e.preventDefault();
			}
		}

		return (
			<SheetPortal shouldPortal={shouldPortal} {...portalProps}>
				<SheetOverlay {...overlayProps} />
				<Content
					className={cn(
						'fixed inset-y-0 z-50 w-3/4 gap-4 overflow-y-auto bg-white p-6 shadow-lg',
						{
							'inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:animate-sheet-content-out-to-right data-[state=open]:animate-sheet-content-in-from-right sm:max-w-sm':
								side === 'right',
							'inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:animate-sheet-content-out-to-left data-[state=open]:animate-sheet-content-in-from-left sm:max-w-sm':
								side === 'left',
						},
						className,
					)}
					ref={ref}
					onOpenAutoFocus={onOpenAutoFocus}
					onEscapeKeyDown={onEscapeKeyDown}
					onInteractOutside={onInteractOutside}
					{...props}
				>
					{hasCloseButton ? (
						<XCircle
							size={45}
							className="absolute right-3 top-2 cursor-default rounded-full bg-alebaster-100 p-2 text-xl text-stone-900 duration-200 hover:bg-gray-200 hover:text-gray-700 lg:cursor-pointer"
							onClick={onClose}
						/>
					) : null}
					{children}
				</Content>
			</SheetPortal>
		);
	},
);
SheetContent.displayName = 'SheetContent';

// Sheet Header
type SheetHeaderRef = ElementRef<'header'>;
type SheetHeaderProps = ComponentPropsWithoutRef<'header'>;
export const SheetHeader = forwardRef<SheetHeaderRef, SheetHeaderProps>(
	({ className, ...props }, ref) => {
		return (
			<header
				className={cn('mb-3 px-6 text-center', className)}
				{...props}
				ref={ref}
			/>
		);
	},
);
SheetHeader.displayName = 'SheetHeader';

// Sheet Body
type SheetBodyRef = ElementRef<'div'>;
type SheetBodyProps = ComponentPropsWithoutRef<'div'>;
export const SheetBody = forwardRef<SheetBodyRef, SheetBodyProps>(
	({ className, ...props }, ref) => {
		return (
			<div
				role="main"
				className={cn('flex flex-col', className)}
				{...props}
				ref={ref}
			/>
		);
	},
);
SheetBody.displayName = 'SheetBody';

// Sheet Footer
type SheetFooterRef = ElementRef<'footer'>;
type SheetFooterProps = ComponentPropsWithoutRef<'footer'>;
export const SheetFooter = forwardRef<SheetFooterRef, SheetFooterProps>(
	({ className, ...props }, ref) => {
		return <footer className={cn('mt-5', className)} {...props} ref={ref} />;
	},
);
SheetFooter.displayName = 'SheetFooter';

// Sheet Title
type SheetTitleRef = ElementRef<typeof Heading>;
type SheetTitleProps = ComponentPropsWithoutRef<typeof Heading>;
export const SheetTitle = forwardRef<SheetTitleRef, SheetTitleProps>(
	({ className, ...props }, ref) => {
		return (
			<Title asChild={true}>
				<Heading
					as="h3"
					className={cn('text-2xl font-semibold', className)}
					{...props}
					ref={ref}
				/>
			</Title>
		);
	},
);
SheetTitle.displayName = 'SheetTitle';

// Sheet Description
type SheetDescriptionRef = ElementRef<typeof Description>;
type SheetDescriptionProps = ComponentPropsWithoutRef<typeof Description>;
export const SheetDescription = forwardRef<
	SheetDescriptionRef,
	SheetDescriptionProps
>(({ className, ...props }, ref) => {
	return (
		<Description
			className={cn('text-base text-gray-500', className)}
			{...props}
			ref={ref}
		/>
	);
});
SheetDescription.displayName = 'SheetDescription';
