import { $, component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';

import { cn } from '@/lib/cn';

interface BackToTopButtonProps {
	top?: number;
	isSmooth?: boolean;
}

export const BackToTopButton = component$<BackToTopButtonProps>(
	({ top = 200, isSmooth = true }) => {
		const isVisible = useSignal(false);
		const btnRef = useSignal<HTMLButtonElement>();

		const scrollToTop = $(() => {
			window.scrollTo({ top: 0, behavior: isSmooth ? 'smooth' : 'auto' });
		});

		useVisibleTask$(({ cleanup, track }) => {
			track(() => top);

			if (btnRef.value) {
				const handleScroll = () => {
					isVisible.value = window.scrollY > top;

					const rootEle = document.documentElement;
					const scrollTop = rootEle.scrollTop;
					const scrollTotal = rootEle.scrollHeight - rootEle.clientHeight;
					const scrollPercent = (scrollTop / scrollTotal) * 100;

					btnRef.value?.style.setProperty(
						'--btt-scroll-percent',
						`${scrollPercent}%`,
					);
				};

				handleScroll();
				window.addEventListener('scroll', handleScroll);

				cleanup(() => {
					window.removeEventListener('scroll', handleScroll);
				});
			}
		});
		return (
			<div
				class={cn(
					'op-0 btt-btn-size pointer-events-none sticky bottom-[--btt-btn-size] left-full z-50 mr-[--btt-btn-size] mb-[--btt-btn-size] max-w-160px translate-y-[--btt-btn-size] transition-[opacity,transform]',
					isVisible.value && 'op-100 pointer-events-unset translate-y-0',
				)}
				u-max-md='w-[--btt-btn-size] h-[--btt-btn-size] overflow-visible'
			>
				<button
					aria-label='Back to top'
					class={cn(
						'group relative inline-flex h-[--btt-btn-size] cursor-pointer items-center gap-2 rounded-md border border-gray-700/10 bg-gray-50/50 px-3 font-medium text-gray-700 shadow-lg backdrop-blur-xs transition-[border-color,background-color,color]',
						// 'before:(content-empty -z-1 op-0 absolute inset-0 bg-gradient-subtle transition-opacity)',
						// 'hover:(text-brand-primary before:op-100) border-transparent',
					)}
					onClick$={scrollToTop}
					ref={btnRef}
					type='button'
					u-before='content-empty -z-1 op-0 absolute inset-0 bg-gradient-subtle transition-opacity'
					u-hover='text-brand-primary before:op-100'
					u-max-md={cn(
						'h-full w-full rounded-full border-none p-2',
						'before:(op-100 rounded-inherit) transition-none',
						'after:(content-empty -z-10 absolute inset-0 block scale-110 rounded-full bg-progress-conic)',
					)}
				>
					<span
						class='flex h-[calc(var(--btt-btn-size)-0.5rem)] items-center justify-center overflow-hidden'
						u-max-md='w-[--btt-btn-size] h-[--btt-btn-size]'
					>
						<i class='i-mdi:arrow-up h-1.5em w-1.5em group-hover:animate-icon-cycle-up' />
					</span>
					<span class='text-lg' u-max-md='sr-only'>
						Back to top
					</span>
				</button>
			</div>
		);
	},
);

// import {
// 	$,
// 	component$,
// 	useSignal,
// 	useStylesScoped$,
// 	useVisibleTask$,
// } from '@builder.io/qwik';

// import { cn } from '@/lib/cn';

// import styles from './back-to-top-button.css?inline';

// interface BackToTopButtonProps {
// 	top?: number;
// 	isSmooth?: boolean;
// }

// export const BackToTopButton = component$<BackToTopButtonProps>(
// 	({ top = 200, isSmooth = true }) => {
// 		useStylesScoped$(styles);

// 		const isVisible = useSignal(false);
// 		const btnRef = useSignal<HTMLButtonElement>();

// 		const scrollToTop = $(() => {
// 			window.scrollTo({ top: 0, behavior: isSmooth ? 'smooth' : 'auto' });
// 		});

// 		useVisibleTask$(({ cleanup, track }) => {
// 			track(() => top);

// 			if (btnRef.value) {
// 				const handleScroll = () => {
// 					isVisible.value = window.scrollY > top;

// 					const rootEle = document.documentElement;
// 					const scrollTop = rootEle.scrollTop;
// 					const scrollTotal = rootEle.scrollHeight - rootEle.clientHeight;
// 					const scrollPercent = (scrollTop / scrollTotal) * 100;

// 					btnRef.value?.style.setProperty(
// 						'--btt-scroll-percent',
// 						`${scrollPercent}%`,
// 					);
// 				};

// 				handleScroll();
// 				window.addEventListener('scroll', handleScroll);

// 				cleanup(() => {
// 					window.removeEventListener('scroll', handleScroll);
// 				});
// 			}
// 		});
// 		return (
// 			<div
// 				class={cn(
// 					'btt-btn-wrapper',
// 					isVisible.value && 'btt-btn-wrapper--visible',
// 				)}
// 			>
// 				<button
// 					aria-label='Back to top'
// 					class={cn('btt-btn')}
// 					onClick$={scrollToTop}
// 					ref={btnRef}
// 					type='button'
// 				>
// 					<span class='btt-btn-icon-wrapper'>
// 						<i class='btt-btn-icon' />
// 					</span>
// 					<span class='text-lg' u-max-md='sr-only'>
// 						Back to top
// 					</span>
// 				</button>
// 			</div>
// 		);
// 	},
// );
