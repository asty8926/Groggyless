/**
 * Calculates optimal bedtime based on desired wake time and time to fall asleep
 * @param {Date} wakeTime - The desired wake up time
 * @param {number} fallAsleepMinutes - Minutes it takes to fall asleep
 * @param {boolean} isNap - Whether this is for a nap or full night's sleep
 * @returns {Array<{bedTime: Date, cycles: number, duration: string}>} Array of recommended bedtimes with cycle and duration info
 */
export function calculateBedTimes(wakeTime, fallAsleepMinutes, isNap) {
	const SLEEP_CYCLE_MINUTES = 90;
	const MIN_CYCLES = isNap ? 1 : 4;
	const MAX_CYCLES = isNap ? 2 : 6;
	
	const recommendations = [];
	
	for (let cycles = MIN_CYCLES; cycles <= MAX_CYCLES; cycles++) {
		const totalMinutes = (cycles * SLEEP_CYCLE_MINUTES) + fallAsleepMinutes;
		const bedTime = new Date(wakeTime);
		bedTime.setMinutes(bedTime.getMinutes() - totalMinutes);
		
		const hours = Math.floor((totalMinutes - fallAsleepMinutes) / 60);
		const minutes = (totalMinutes - fallAsleepMinutes) % 60;
		const duration = `${hours}h ${minutes}m`;
		
		recommendations.push({
			bedTime,
			cycles,
			duration
		});
	}
	
	return recommendations;
}

/**
 * Formats a date object to display time in 12-hour format
 * @param {Date} date - The date to format
 * @returns {string} Formatted time string (e.g., "11:30 PM")
 */
export function formatTime(date) {
	return date.toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: '2-digit',
		hour12: true
	});
}