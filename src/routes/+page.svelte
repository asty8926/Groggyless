<script>
	import TimeInput from '$lib/components/TimeInput.svelte';
	import BedTimeList from '$lib/components/BedTimeList.svelte';
	import SleepSettings from '$lib/components/SleepSettings.svelte';
	import Stars from '$lib/components/Stars.svelte';
	import { calculateBedTimes } from '$lib/utils/sleep-calculator';
	import { fallAsleepMinutes, isNapMode } from '$lib/stores/sleep-settings';
	
	let wakeTime = '';
	let bedTimes = [];
	
	$: if (wakeTime) {
		const [hours, minutes] = wakeTime.split(':');
		const wakeDate = new Date();
		wakeDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
		bedTimes = calculateBedTimes(wakeDate, $fallAsleepMinutes, $isNapMode);
	} else {
		bedTimes = [];
	}
	
	function handleTimeChange(event) {
		wakeTime = event.detail;
	}
</script>

<svelte:head>
	<title>Sleep Cycle Calculator</title>
	<meta name="description" content="Calculate the perfect bedtime based on your desired wake-up time" />
</svelte:head>

<Stars />

<div class="min-h-screen bg-gradient-to-b from-night-400 to-night-600 py-12 px-4 sm:px-6 lg:px-8">
	<div class="relative mx-auto max-w-md">
		<div class="text-center">
			<div class="mb-6 inline-block animate-float">
				<svg class="h-12 w-12 text-moon-400" viewBox="0 0 24 24" fill="currentColor">
					<path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
				</svg>
			</div>
			<h1 class="text-3xl font-bold text-moon-100">Sleep Cycle Calculator</h1>
			<p class="mt-2 text-sm text-moon-50">
				Find the perfect bedtime for a refreshing wake-up
			</p>
		</div>
		
		<div class="mt-8 rounded-lg bg-night-300/30 p-6 shadow-xl backdrop-blur-sm">
			<TimeInput
				label="What time do you want to wake up?"
				value={wakeTime}
				on:change={handleTimeChange}
			/>
			
			<SleepSettings />
			
			<BedTimeList {bedTimes} />
		</div>
	</div>
</div>