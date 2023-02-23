export const MINUTE_MILIS = 60 * 1000

export const HOUR_MILIS = 60 * MINUTE_MILIS

export const DAY_MILIS = 24 * HOUR_MILIS

export const WEEK_MILIS = DAY_MILIS * 7

export const now = (offser: number = 0): number => new Date().getTime() + offser