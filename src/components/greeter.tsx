import {
	component$,
	useComputed$,
	useId,
	useSignal,
	useVisibleTask$,
} from '@builder.io/qwik';

interface GreeterProps {
	name: string;
}

export const Greeter = component$(({ name }: GreeterProps) => {
	const message = useSignal('no message');
	const elemIdSignal = useSignal<string | null>(null);
	const id = useId();
	const elemId = `${id}-example`;

	const herName = useSignal('Mai');
	const capitalizeName = useComputed$(() => {
		return herName.value.toUpperCase();
	});

	console.info('server-side id:', elemId);

	useVisibleTask$(() => {
		const elem = document.getElementById(elemId);
		elemIdSignal.value = elem?.getAttribute('id') || null;
		console.info('client-side id:', elemIdSignal.value);
	});

	return (
		<div>
			<h1 class='font-bold text-3xl underline'>
				<p>
					Gửi lời chào đến: <strong>{name}</strong>
				</p>
				<p>
					<em>{message.value}</em>
				</p>
				<button
					onClick$={() => {
						message.value = `Chào ${name}! Rất vui được gặp bạn.`;
					}}
					type='button'
				>
					Chào hỏi!
				</button>
			</h1>
			<input type='text' bind:value={herName} />
			<p>Name: {herName.value}</p>
			<p>Capitalized name: {capitalizeName.value}</p>
			<div id={elemId}>
				Both server-side and client-side console should match this id:
				<br />
				<b>{elemIdSignal.value || null}</b>
			</div>
		</div>
	);
});
