export function getTimeAndTimeZone(dateTimeString: string): string {
    let date = new Date(dateTimeString);

    let hours = date.getUTCHours();
    let minutes = date.getUTCMinutes();

    let formattedHours = hours < 10 ? `0${hours}` : hours.toString();
    let formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();

    let timeZoneOffset = date.getTimezoneOffset() / 60;
    let timeZone = timeZoneOffset >= 0 ? `+${timeZoneOffset}` : timeZoneOffset.toString();

    return `${formattedHours}:${formattedMinutes} ${timeZone}`;
}
export function getDate(dateTimeString: string): string {
    let date: Date = new Date(dateTimeString);

    let year: number = date.getUTCFullYear();
    let month: number = date.getUTCMonth() + 1;
    let day: number = date.getUTCDate();

    let formattedYear: string = year.toString();
    let formattedMonth: string = month < 10 ? `0${month}` : month.toString();
    let formattedDay: string = day < 10 ? `0${day}` : day.toString();

    return `${formattedDay}.${formattedMonth}.${formattedYear}`;
}