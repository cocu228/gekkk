export function getTimeAndTimeZone(inputDate: number): string {
    const date = new Date(inputDate * 1000);


    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);

    return `${hours}:${minutes}`;
}
export function getDate(dateTimeString: string): string {
    let date: Date = new Date(dateTimeString);

    // Получение компонентов даты
    let year: number = date.getUTCFullYear();
    let month: number = date.getUTCMonth() + 1; // Месяцы начинаются с 0, поэтому добавляем 1
    let day: number = date.getUTCDate();

    // Форматирование даты
    let formattedYear: string = year.toString();
    let formattedMonth: string = month < 10 ? `0${month}` : month.toString();
    let formattedDay: string = day < 10 ? `0${day}` : day.toString();

    return `${formattedDay}.${formattedMonth}.${formattedYear}`;
}