import { writable } from 'svelte/store';

export const fallAsleepMinutes = writable(15);
export const isNapMode = writable(false);