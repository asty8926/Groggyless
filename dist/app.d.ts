declare const utils: {
    select: (selector: string) => HTMLElement | null;
};
declare const startDropdownEl: HTMLSelectElement;
declare const endDropdownEl: HTMLSelectElement;
declare const outputEl: HTMLDivElement;
declare function generateHours(): number[];
declare function generateMinutes(step?: number): number[];
declare function generateHoursMinutesStringsArray(minutesStep?: number): string[];
declare function generateSelectOptions(options: string[]): HTMLOptionElement[];
declare function clearSelectElementChildren(selectElement: HTMLSelectElement): void;
declare function mountOptionsToElement(element: HTMLElement, options: HTMLOptionElement[]): void;
declare let hoursMinutesArray: string[];
declare function currentTimeString(): string;
declare function generateRecommendedDatetimeFromNow(step?: number, durationHours?: number): Date[];
declare function convertToTimeStringsFromNow(step?: number, durationHours?: number): string[];
declare function calculateDurationFromNow(formattedTime: string): string;
declare function calculateDurationString(duration: number, format?: string): string;
declare function populateOutputWithTimeStrings(): void;
