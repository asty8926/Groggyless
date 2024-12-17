<script>
	import { createEventDispatcher } from 'svelte';
	
	export let label = '';
	export let value = '';
	
	const dispatch = createEventDispatcher();
	
	function handleInput(event) {
		dispatch('change', event.target.value);
	}
</script>

<div class="flex flex-col gap-2">
	<label class="text-sm font-medium text-moon-100">{label}</label>
	<input
		type="time"
		{value}
		on:input={handleInput}
		class="w-full rounded-lg border-night-200 bg-night-300 text-moon-100 shadow-lg focus:border-moon-200 focus:ring-moon-200"
	/>
</div>