<script>
	import NumberInput from './NumberInput.svelte';
	import Toggle from './Toggle.svelte';
	import Collapsible from './Collapsible.svelte';
	import { fallAsleepMinutes, isNapMode } from '$lib/stores/sleep-settings';
	
	let isOpen = false;
</script>

<div class="mt-4">
	<Collapsible title="Sleep Settings" bind:isOpen>
		<div class="space-y-4">
			<Toggle
				label="Nap Mode"
				checked={$isNapMode}
				on:change={(e) => isNapMode.set(e.detail)}
			/>
			<NumberInput
				label="Time to fall asleep"
				value={$fallAsleepMinutes}
				min={5}
				max={60}
				step={5}
				unit="minutes"
				on:change={(e) => fallAsleepMinutes.set(e.detail)}
			/>
		</div>
	</Collapsible>
</div>