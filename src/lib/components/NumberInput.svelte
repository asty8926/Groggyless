<script>
	import { createEventDispatcher } from 'svelte';
	
	export let label = '';
	export let value = 0;
	export let min = 0;
	export let max = 60;
	export let step = 1;
	export let unit = '';
	
	const dispatch = createEventDispatcher();
	
	function handleInput(event) {
		const newValue = parseInt(event.target.value);
		dispatch('change', newValue);
	}
</script>

<div class="flex flex-col gap-2">
	<label class="text-sm font-medium text-moon-100">{label}</label>
	<div class="flex items-center gap-2">
		<input
			type="number"
			{value}
			{min}
			{max}
			{step}
			on:input={handleInput}
			class="w-20 rounded-lg border-night-200 bg-night-300 text-moon-100 shadow-lg focus:border-moon-200 focus:ring-moon-200"
		/>
		{#if unit}
			<span class="text-sm text-moon-50">{unit}</span>
		{/if}
	</div>
</div>