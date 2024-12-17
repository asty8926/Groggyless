<script>
	import { createEventDispatcher } from 'svelte';
	
	export let label = '';
	export let checked = false;
	
	const dispatch = createEventDispatcher();
	
	function handleChange(event) {
		dispatch('change', event.target.checked);
	}
</script>

<div class="flex items-center justify-between">
	<span class="text-sm font-medium text-moon-100">{label}</span>
	<button
		type="button"
		class="relative inline-flex h-6 w-11 items-center rounded-full {checked ? 'bg-moon-300' : 'bg-night-200'}"
		role="switch"
		aria-checked={checked}
		on:click={() => dispatch('change', !checked)}
	>
		<span class="sr-only">{label}</span>
		<span
			class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out {checked ? 'translate-x-6' : 'translate-x-1'}"
		/>
	</button>
</div>