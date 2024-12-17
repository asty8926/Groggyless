<script>
	import { slide } from 'svelte/transition';
	
	export let title = '';
	export let isOpen = false;
</script>

<div class="rounded-lg bg-night-300/50 p-4 backdrop-blur-sm">
	<button
		class="flex w-full items-center justify-between"
		on:click={() => (isOpen = !isOpen)}
		aria-expanded={isOpen}
	>
		<h3 class="text-sm font-medium text-moon-100">{title}</h3>
		<svg
			class="h-5 w-5 text-moon-100 transition-transform duration-200 {isOpen ? 'rotate-180' : ''}"
			viewBox="0 0 20 20"
			fill="currentColor"
		>
			<path
				fill-rule="evenodd"
				d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
				clip-rule="evenodd"
			/>
		</svg>
	</button>
	
	{#if isOpen}
		<div transition:slide={{ duration: 200 }} class="mt-3">
			<slot />
		</div>
	{/if}
</div>