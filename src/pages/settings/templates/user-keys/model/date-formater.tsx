export function formatDate(inputDate) {
    let date = new Date(inputDate);
    
    let day = date.getUTCDate();
    let month = date.getUTCMonth() + 1;
    let year = date.getUTCFullYear() % 100;

    let hour = date.getUTCHours();
    let minute = date.getUTCMinutes();

    let formattedDate = `${year < 10 ? '0' : ''}${year}/${month < 10 ? '0' : ''}${month}/${day < 10 ? '0' : ''}${day}`;
    let formattedTime = `${hour < 10 ? '0' : ''}${hour}:${minute < 10 ? '0' : ''}${minute}`;
    
    let timeZoneOffset = '+0';

    return `${formattedDate} ${formattedTime} ${timeZoneOffset}`;
}
