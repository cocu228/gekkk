export enum TabKey {
    MONTH = 'month',
    DAYS_30 = 'days_30',
    DAYS_90 = 'days_90',
    YEAR = 'year',
    CUSTOM = 'custom',
}

export type HistoryTab = {
    Key: TabKey;
    Title: string;
    StartDate?: string;
    EndDate?: string;
}

export interface Props {
    title: string,
    currency: string,
    className: string
}