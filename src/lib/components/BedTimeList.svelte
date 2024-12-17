<script>
	import { formatTime } from '$lib/utils/sleep-calculator';
	
	export let bedTimes = [];
</script>

{#if bedTimes.length > 0}
	<div class="mt-6 space-y-4">
		<h2 class="text-lg font-semibold text-moon-100">Recommended bedtimes:</h2>
		<p class="text-sm text-moon-50">
			For optimal rest, try to fall asleep at one of these times:
		</p>
		<ul class="space-y-3">
			{#each bedTimes as { bedTime, cycles, duration }}
				<li class="rounded-lg bg-night-300/50 p-4 shadow-lg backdrop-blur-sm transition-all hover:bg-night-300">
					<div class="flex items-center justify-between">
						<div>
							<span class="text-xl font-bold text-moon-300">{formatTime(bedTime)}</span>
							<span class="ml-2 text-sm text-moon-50">({cycles} sleep cycles)</span>
						</div>
						<span class="text-sm font-medium text-moon-100">{duration} of sleep</span>
					</div>
				</li>
			{/each}
		</ul>
	</div>
{/if}