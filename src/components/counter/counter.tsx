import {
	$,
	component$,
	type QRL,
	useSignal,
	useStore,
	useStylesScoped$,
} from '@builder.io/qwik';

interface CountStore {
	count: number;
	increment: QRL<(this: CountStore) => void>;
}

export const Counter = component$(() => {
	useStylesScoped$(`
    .count-value {
      font-size: 1.5rem;
      margin-top: 1rem;
      font-weight: bold;
    }
  `);

	const count = useSignal(0);
	const state = useStore({
		name: 'Counter Component',
		version: '1.0.0',
		count: 0,
		increment: $(function (this: CountStore) {
			this.count++;
		}),
	});

	return (
		<>
			<button
				class='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
				onClick$={() => count.value++}
				type='button'
				u-sm='m-2 bg-red-500 p-2 text-orange-500'
			>
				Count: {count.value}
			</button>
			<button onClick$={() => state.increment()} type='button'>
				Increment
			</button>
			<p class='count-value'>Count: {state.count}</p>
		</>
	);
});
