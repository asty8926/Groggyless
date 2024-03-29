<script lang="ts">
	import { config } from '$lib';

	$: bedtime = new Date();
	$: waketime = new Date(Date.now() + config.sleepMinDuration * 60 * 60 * 1000);

	function getDateTimes(): string[] {
		const dates: Date[] = [];
		const startDate = new Date(bedtime.getTime());
		const endDate = new Date(waketime.getTime());
		if (waketime.getTime() < bedtime.getTime()) {
			endDate.setDate(endDate.getDate() + 1);
		}

		for (
			let date = new Date(startDate.getTime());
			date.getTime() <= endDate.getTime();
			date.setMinutes(date.getMinutes() + config.sleepCycleDuration)
		) {
			dates.push(new Date(date.getTime()));
		}

		return dates.map((date) => {
			const hours = String(date.getHours()).padStart(2, '0');
			const minutes = String(date.getMinutes()).padStart(2, '0');
			return `${hours}:${minutes}`;
		});
	}
</script>

<input type="time" bind:value={bedtime} />
<input type="time" bind:value={waketime} />
{#each getDateTimes() as time}
	<div>{time}</div>
{/each}

<a class="text-blue-500" href="/">back home fam</a>
