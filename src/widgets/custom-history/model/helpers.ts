export function getFirstDayOfPreviousMonth(): Date {
    const currentDate = new Date();
    const firstDayCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    
    firstDayCurrentMonth.setMonth(firstDayCurrentMonth.getMonth() - 1);
    
    return new Date(firstDayCurrentMonth.getFullYear(), firstDayCurrentMonth.getMonth(), 1);
}
