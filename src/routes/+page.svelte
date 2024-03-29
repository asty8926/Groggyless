<script lang="ts">
	import { config } from '$lib';

	let mode: 'sleep' | 'nap' = 'sleep';
	$: minDuration = mode === 'sleep' ? config.sleepMinDuration : config.napMinDuration;
	// $: maxDuration = mode === 'sleep' ? config.sleepMaxDuration : config.napMaxDuration;

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

<div>
	<label>
		<input type="radio" bind:group={mode} value="sleep" />
		Sleep
	</label>
	<label>
		<input type="radio" bind:group={mode} value="nap" />
		Nap
	</label>
</div>

<span
	>Current time: {new Intl.DateTimeFormat('default', {
		hour: 'numeric',
		minute: 'numeric',
		hour12: false
	}).format(new Date())}</span
>

<div>Suggested alarms:</div>
{#key mode}
	{#each formatDateArray(cyclesAmount) as suggestedTime}
		<div>{suggestedTime}</div>
	{/each}
{/key}

<!-- <a class="text-blue-500" href="/sleepcalc">Sleep Calc</a> -->
