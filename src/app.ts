const utils = {
	select: (selector: string): HTMLElement | null => document.querySelector(selector)
  };
  
const startDropdownEl = utils.select("#startDropdown") as HTMLSelectElement
const endDropdownEl = utils.select('#endDropdown') as HTMLSelectElement
const outputEl = utils.select(".output-container") as HTMLDivElement

function generateHours(): number[] {
	const hours: number[] = [];
	
	for (let i = 0; i <= 23; i++) {
	  hours.push(i);
	}
	
	return hours;
}
  
function generateMinutes(step: number = 15): number[] {
	const minutes: number[] = [];
	const limit = 60 - step // = 45 when step is 15
	
	for (let i = 0; i <= limit; i += step) {
	  minutes.push(i);
	}
	
	return minutes;
}

function generateHoursMinutesStringsArray(minutesStep: number = 15): string[] {
	const hours = generateHours();
	const minutes = generateMinutes(minutesStep);
  
	const result: string[] = [];
  
	for (const hour of hours) {
	  for (const minute of minutes) {
		const timeString = `${hour}:${minute.toString().padStart(2, '0')}`;
		result.push(timeString);
	  }
	}
  
	return result;
	// ["0:00", "0:15", ..., "23:45"]
  }
  
  
function generateSelectOptions(options: string[]): HTMLOptionElement[] {
	const optionElements: HTMLOptionElement[] = [];
	
	for (const optionText of options) {
	  const option = document.createElement('option');
	  option.text = optionText;
	  optionElements.push(option);
	}
	
	return optionElements;
  }
  
function clearSelectElementChildren(selectElement: HTMLSelectElement): void {
	selectElement.innerHTML = ``
}

function mountOptionsToElement(element: HTMLElement, options: HTMLOptionElement[]): void {
	const selectElement = element as HTMLSelectElement;

	clearSelectElementChildren(selectElement)

	for (const option of options) {
	  selectElement.appendChild(option);
	}
  }
  
let hoursMinutesArray: string[] = generateHoursMinutesStringsArray()

mountOptionsToElement(startDropdownEl, generateSelectOptions(hoursMinutesArray))
mountOptionsToElement(endDropdownEl, generateSelectOptions(hoursMinutesArray))

/* DATE */
/* TESTING */

function currentTimeString(): string {
	let now: Date = new Date()
	let timeString: string = now.getHours() + ":" + now.getMinutes().toString().padStart(2, '0')
	return timeString
}

//outputEl.innerText = "Output (Timeline) " + currentTimeString()

// Archiving V1 it as it's its first and old version
// function generateRecommendedDatetimeFromNow(step: number = 1.5, length: number = 10): Date[] {
// 	// It includes the current time so we need 1 more length for the willing length to apply
// 	length = length + 1
// 	const millisecondsPerHour: number = 60 * 60 * 1000;
// 	const millisecondsPerMinute: number = 60 * 1000;
  
// 	const currentDate: Date = new Date();
// 	const initialTimestamp: number = currentDate.getTime();
// 	const stepMilliseconds: number = step * millisecondsPerHour + 30 * millisecondsPerMinute;
  
// 	const dateArray: Date[] = [currentDate];
  
// 	let nextTimestamp: number = initialTimestamp + stepMilliseconds;
// 	let nextDate: Date = new Date(nextTimestamp);
  
// 	while (dateArray.length < length) {
// 	  dateArray.push(nextDate);
// 	  nextTimestamp += stepMilliseconds;
// 	  nextDate = new Date(nextTimestamp);
// 	}
  
// 	return dateArray;
//   }

//Archiving V2 of the function
// function generateRecommendedDatetimeFromNow(step: number = 1.5, durationHours: number = 10): Date[] {
// 	const millisecondsPerHour: number = 60 * 60 * 1000;
// 	const millisecondsPerMinute: number = 60 * 1000;
	
// 	const currentDate: Date = new Date();
// 	const initialTimestamp: number = currentDate.getTime();
// 	const stepMilliseconds: number = step * millisecondsPerHour + 30 * millisecondsPerMinute;
// 	const durationMilliseconds: number = durationHours * millisecondsPerHour;
	
// 	const dateArray: Date[] = [currentDate];
	
// 	let nextTimestamp: number = initialTimestamp + stepMilliseconds;
// 	let nextDate: Date = new Date(nextTimestamp);
	
// 	while (nextTimestamp - initialTimestamp <= durationMilliseconds) {
// 	  dateArray.push(nextDate);
// 	  nextTimestamp += stepMilliseconds;
// 	  nextDate = new Date(nextTimestamp);
// 	}
	
// 	return dateArray;
//   }

// Archiving V3
// function generateRecommendedDatetimeFromNow(step: number = 1.5, durationHours: number = 10): Date[] {
// 	const millisecondsPerHour: number = 60 * 60 * 1000;
// 	const millisecondsPerMinute: number = 60 * 1000;
  
// 	const currentDate: Date = new Date();
// 	const initialTimestamp: number = currentDate.getTime();
// 	const stepMilliseconds: number = step * millisecondsPerHour + 30 * millisecondsPerMinute;
// 	const durationMilliseconds: number = durationHours * millisecondsPerHour;
  
// 	const dateArray: Date[] = [];
  
// 	for (let i = 0; i <= durationMilliseconds / stepMilliseconds; i++) {
// 	  const timestamp: number = initialTimestamp + i * stepMilliseconds;
// 	  dateArray.push(new Date(timestamp));
// 	}
  
// 	return dateArray;
//   }

function generateRecommendedDatetimeFromNow(step: number = 1.5, durationHours: number = 10.5): Date[] {
	const millisecondsPerHour: number = 60 * 60 * 1000;
	const millisecondsPerMinute: number = 60 * 1000;
  
	const currentDate: Date = new Date();
	const initialTimestamp: number = currentDate.getTime();
	const stepHours: number = Math.floor(step);
	const stepMinutes: number = (step - stepHours) * 60;
	const stepMilliseconds: number = stepHours * millisecondsPerHour + stepMinutes * millisecondsPerMinute;
	const durationMilliseconds: number = durationHours * millisecondsPerHour;
  
	const dateArray: Date[] = [];
  
	for (let i = 0; i <= durationMilliseconds / stepMilliseconds; i++) {
	  const timestamp: number = initialTimestamp + i * stepMilliseconds;
	  dateArray.push(new Date(timestamp));
	}
  
	return dateArray;
  }
  

// Usage
// const arrayOfDates: Date[] = generateRecommendedDatetimeFromNow(1.5, 10);
// console.log(arrayOfDates);
  
function convertToTimeStringsFromNow(step: number = 1.5, durationHours: number = 10.5): string[] {
	let formattedTimeStringsArray: string[] = []
	generateRecommendedDatetimeFromNow(step, durationHours).forEach((date) => {
		const formattedTime: string = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})
		formattedTimeStringsArray.push(formattedTime)
	})
	return formattedTimeStringsArray;
}

// console.log(convertToTimeStringsFromNow())

function calculateDurationFromNow(formattedTime: string): string {
	const currentTime: Date = new Date();
	const [hours, minutes] = formattedTime.split(':').map(Number);
  
	const targetTime: Date = new Date();
	targetTime.setHours(hours);
	targetTime.setMinutes(minutes + 1);
	targetTime.setSeconds(0);
  
	const timeDifference: number = targetTime.getTime() - currentTime.getTime();
  
	if (timeDifference < 0) {
	  // Add 24 hours to the target time and calculate the new time difference
	  targetTime.setDate(targetTime.getDate() + 1);
	  const newTimeDifference: number = targetTime.getTime() - currentTime.getTime();
	  return calculateDurationString(newTimeDifference);
	} else if (timeDifference === 0) {
	  return 'Now';
	} else {
	  return calculateDurationString(timeDifference);
	}
  }
  
  function calculateDurationString(duration: number, format: string = "full"): string {
	if (duration === 0) {
	  return 'Now';
	}
  
	const durationHours: number = Math.floor(duration / (60 * 60 * 1000));
	const durationMinutes: number = Math.floor((duration % (60 * 60 * 1000)) / (60 * 1000));
  
	let durationString = '';
  
	const lowercaseFormat = format.toLowerCase();
  
	if (lowercaseFormat === 'full') {
	  if (durationHours > 0) {
		durationString += `in ${durationHours} hour${durationHours === 1 ? '' : 's'}`;
	  }
  
	  if (durationMinutes > 0) {
		if (durationString.length > 0) {
		  durationString += ' and ';
		}
		durationString += `${durationMinutes} minute${durationMinutes === 1 ? '' : 's'}`;
	  }
	} else if (lowercaseFormat === 'short') {
	  if (durationHours > 0) {
		durationString += `in ${durationHours}h`;
	  }
  
	  if (durationMinutes > 0) {
		if (durationString.length > 0) {
		  durationString += '';
		}
		durationString += `${durationMinutes}m`;
	  }
	}
  
	if (durationString.length === 0) {
	  durationString = 'Now';
	}
  
	return durationString;
  }
  
  
function populateOutputWithTimeStrings(): void {
	const outputTimelineContainer = document.createElement("div")
	outputTimelineContainer.classList.add("output-timeline__container")
	let formattedTimeStringsArray: string[] = convertToTimeStringsFromNow()

	formattedTimeStringsArray.forEach(formattedTime => {
		const timelineItemContainerEl = document.createElement("div")
		timelineItemContainerEl.classList.add("output-timeline__item-container")

		const timelineItemEl = document.createElement("span")
		timelineItemEl.classList.add("output-timeline__item-hour")
		timelineItemEl.innerText = formattedTime

		const timeInItemEl = document.createElement("span")
		timeInItemEl.classList.add("output-timeline__item-timeIn")
		// Duration from now
		timeInItemEl.innerText = `${calculateDurationFromNow(formattedTime)}`

		timelineItemContainerEl.appendChild(timelineItemEl)
		timelineItemContainerEl.appendChild(timeInItemEl)

		outputTimelineContainer.appendChild(timelineItemContainerEl)
	})
	outputEl.appendChild(outputTimelineContainer)
}

populateOutputWithTimeStrings()