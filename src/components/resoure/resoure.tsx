import {
	component$,
	Resource,
	useResource$,
	useSignal,
	useStylesScoped$,
	// useStyles$,
} from '@builder.io/qwik';

import styles from './resource.css?inline';
// import styles from './resource.module.css';

export const ResourcePost = component$(() => {
	useStylesScoped$(styles);
	// useStyles$(styles);

	const postId = useSignal('23');

	const postTitle = useResource$<string>(async ({ track }) => {
		// it will run first on mount (server), then re-run whenever postId changes (client)
		// this means this code will run on the server and the browser
		track(() => postId.value);

		const res = await fetch(
			`https://jsonplaceholder.typicode.com/posts/${postId.value}`,
		);
		const data: { title: string } = await res.json();
		return data.title;
	});

	return (
		<>
			<input
				class={['post-input']}
				max={100}
				min={0}
				type='number'
				bind:value={postId}
			/>
			<h1 class={['post-title']}>Post#{postId}:</h1>
			<Resource
				onPending={() => <p>Loading...</p>}
				onResolved={(title) => <h2>{title}</h2>}
				value={postTitle}
			/>
		</>
	);
});
