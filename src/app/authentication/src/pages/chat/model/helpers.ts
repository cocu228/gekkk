import {MD5} from 'crypto-js';

export function generateUid() {
	// Generate a random Uint32 value as a string
	const uid = Math.floor(Math.random() * 0xffffffff).toString(16);
	// Calculate the MD5 hash of the UID using crypto-js
	const hashUid = MD5(uid).toString();
	
	return hashUid;
}

export function timestampToTimeFormat(epochTimestamp: number) {
	const date = new Date(epochTimestamp * 1000); // Convert to milliseconds
	const timeString = date.toLocaleTimeString('en-GB', {
		hour: '2-digit',
		minute: '2-digit',
	});
	
	return timeString;
}

export function timestampToDateFormat(epochTimestamp: number) {
	const date = new Date(epochTimestamp * 1000);
	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const year = date.getFullYear();
	
	return `${day}.${month}.${year}`;
}

export function timestampToDayYear(epochTimestamp: number) {
	const date = new Date(epochTimestamp * 1000);
	const day = String(date.getDate()).padStart(2, '0');
	const year = date.getFullYear();
	
	return `${day}.${year}`;
}
