"use strict";
const utils = {
    select: (selector) => document.querySelector(selector)
};
const startDropdownEl = utils.select("#startDropdown");
const endDropdownEl = utils.select('#endDropdown');
const outputEl = utils.select(".output-container");
function generateHours() {
    const hours = [];
    for (let i = 0; i <= 23; i++) {
        hours.push(i);
    }
    return hours;
}
function generateMinutes(step = 15) {
    const minutes = [];
    const limit = 60 - step;
    for (let i = 0; i <= limit; i += step) {
        minutes.push(i);
    }
    return minutes;
}
function generateHoursMinutesStringsArray(minutesStep = 15) {
    const hours = generateHours();
    const minutes = generateMinutes(minutesStep);
    const result = [];
    for (const hour of hours) {
        for (const minute of minutes) {
            const timeString = `${hour}:${minute.toString().padStart(2, '0')}`;
            result.push(timeString);
        }
    }
    return result;
}
function generateSelectOptions(options) {
    const optionElements = [];
    for (const optionText of options) {
        const option = document.createElement('option');
        option.text = optionText;
        optionElements.push(option);
    }
    return optionElements;
}
function clearSelectElementChildren(selectElement) {
    selectElement.innerHTML = ``;
}
function mountOptionsToElement(element, options) {
    const selectElement = element;
    clearSelectElementChildren(selectElement);
    for (const option of options) {
        selectElement.appendChild(option);
    }
}
let hoursMinutesArray = generateHoursMinutesStringsArray();
mountOptionsToElement(startDropdownEl, generateSelectOptions(hoursMinutesArray));
mountOptionsToElement(endDropdownEl, generateSelectOptions(hoursMinutesArray));
function currentTimeString() {
    let now = new Date();
    let timeString = now.getHours() + ":" + now.getMinutes().toString().padStart(2, '0');
    return timeString;
}
function generateRecommendedDatetimeFromNow(step = 1.5, durationHours = 10.5) {
    const millisecondsPerHour = 60 * 60 * 1000;
    const millisecondsPerMinute = 60 * 1000;
    const currentDate = new Date();
    const initialTimestamp = currentDate.getTime();
    const stepHours = Math.floor(step);
    const stepMinutes = (step - stepHours) * 60;
    const stepMilliseconds = stepHours * millisecondsPerHour + stepMinutes * millisecondsPerMinute;
    const durationMilliseconds = durationHours * millisecondsPerHour;
    const dateArray = [];
    for (let i = 0; i <= durationMilliseconds / stepMilliseconds; i++) {
        const timestamp = initialTimestamp + i * stepMilliseconds;
        dateArray.push(new Date(timestamp));
    }
    return dateArray;
}
function convertToTimeStringsFromNow(step = 1.5, durationHours = 10.5) {
    let formattedTimeStringsArray = [];
    generateRecommendedDatetimeFromNow(step, durationHours).forEach((date) => {
        const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        formattedTimeStringsArray.push(formattedTime);
    });
    return formattedTimeStringsArray;
}
function calculateDurationFromNow(formattedTime) {
    const currentTime = new Date();
    const [hours, minutes] = formattedTime.split(':').map(Number);
    const targetTime = new Date();
    targetTime.setHours(hours);
    targetTime.setMinutes(minutes + 1);
    targetTime.setSeconds(0);
    const timeDifference = targetTime.getTime() - currentTime.getTime();
    if (timeDifference < 0) {
        targetTime.setDate(targetTime.getDate() + 1);
        const newTimeDifference = targetTime.getTime() - currentTime.getTime();
        return calculateDurationString(newTimeDifference);
    }
    else if (timeDifference === 0) {
        return 'Now';
    }
    else {
        return calculateDurationString(timeDifference);
    }
}
function calculateDurationString(duration, format = "full") {
    if (duration === 0) {
        return 'Now';
    }
    const durationHours = Math.floor(duration / (60 * 60 * 1000));
    const durationMinutes = Math.floor((duration % (60 * 60 * 1000)) / (60 * 1000));
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
    }
    else if (lowercaseFormat === 'short') {
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
function populateOutputWithTimeStrings() {
    const outputTimelineContainer = document.createElement("div");
    outputTimelineContainer.classList.add("output-timeline__container");
    let formattedTimeStringsArray = convertToTimeStringsFromNow();
    formattedTimeStringsArray.forEach(formattedTime => {
        const timelineItemContainerEl = document.createElement("div");
        timelineItemContainerEl.classList.add("output-timeline__item-container");
        const timelineItemEl = document.createElement("span");
        timelineItemEl.classList.add("output-timeline__item-hour");
        timelineItemEl.innerText = formattedTime;
        const timeInItemEl = document.createElement("span");
        timeInItemEl.classList.add("output-timeline__item-timeIn");
        timeInItemEl.innerText = `${calculateDurationFromNow(formattedTime)}`;
        timelineItemContainerEl.appendChild(timelineItemEl);
        timelineItemContainerEl.appendChild(timeInItemEl);
        outputTimelineContainer.appendChild(timelineItemContainerEl);
    });
    outputEl.appendChild(outputTimelineContainer);
}
populateOutputWithTimeStrings();
//# sourceMappingURL=app.js.map