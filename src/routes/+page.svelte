<script lang="ts">
	import { config } from '$lib';

	let mode: 'sleep' | 'nap' = 'sleep';
	$: minDuration = mode === 'sleep' ? config.sleepMinDuration : config.napMinDuration;
	$: maxDuration = mode === 'sleep' ? config.sleepMaxDuration : config.napMaxDuration;

	$: cyclesAmount = config.sleepMaxDuration - config.sleepMinDuration;

	function getIncrementingHourDates(N: number): Date[] {
		const dates: Date[] = [];
		const currentDate = new Date(Date.now() + minDuration * 60 * 60 * 1000); // increment by the number of hours in sleepMinDuration (not minutes)

		for (let i = 0; i < N; i++) {
			const date = new Date(currentDate.getTime() + i * config.sleepCycleDuration * 60 * 1000); // increment by the number of minutes in sleepCycleDuration
			dates.push(date);
		}
		return dates;
	}

	function formatDateArray(N: number): string[] {
		let dates: Date[] = getIncrementingHourDates(N);
		return dates.map((date) => {
			const hours = String(date.getHours()).padStart(2, '0');
			const minutes = String(date.getMinutes()).padStart(2, '0');
			return `${hours}:${minutes}`;
		});
	}
</script>

<!-- <div class="flex items-center">
	<input
		type="checkbox"
		id="toggle-switch"
		class="sr-only"
		on:change={() => (mode = mode === 'sleep' ? 'nap' : 'sleep')}
		checked={mode === 'nap'}
	/>
	<label
		for="toggle-switch"
		class="relative inline-block w-14 h-8 transition-all duration-300 bg-gray-200 rounded-full"
		style="background-color: {mode === 'nap' ? '#6366F1' : 'white'}"
	>
		<span
			class="absolute inline-block h-8 w-8 transition-all rounded-full bg-white shadow-md"
			style="left: {mode === 'nap' ? '0' : 'calc(100% - 14px)'}; background-color: {mode === 'nap'
				? 'white'
				: '#6366F1'}"
		></span>
	</label>
	<span class="ml-2">{mode === 'sleep' ? 'Sleep' : 'Nap'}</span>
</div> -->

<label for="mode-radio-group">Mode:</label>
<div class="mt-2">
	<input type="radio" id="sleep-radio" name="mode-radio-group" value="sleep" bind:group={mode} />
	<label for="sleep-radio" class="ml-2">Sleep</label>
	<input type="radio" id="nap-radio" name="mode-radio-group" value="nap" bind:group={mode} />
	<label for="nap-radio" class="ml-2">Nap</label>
</div>

<span
	>Current time: {new Intl.DateTimeFormat('default', {
		hour: 'numeric',
		minute: 'numeric',
		hour12: false
	}).format(new Date())}</span
>

<div>
	To get between {minDuration} and {maxDuration} hour{maxDuration > 1 ? 's' : ''} of sleep, you need
	to wake up at these suggested times:
</div>

<!-- <div>Suggested alarms:</div> -->
{#key mode}
	{#each formatDateArray(cyclesAmount) as suggestedTime}
		<div>{suggestedTime}</div>
	{/each}
{/key}

<!-- <a class="text-blue-500" href="/sleepcalc">Sleep Calc</a> -->
