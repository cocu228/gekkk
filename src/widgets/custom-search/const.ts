import { ISelect } from "./types";

export const dateFormat = 'YYYY-MM-DD';

export const options:ISelect[] = [
    {
        label: 'top up',value: [1,3,5] 
    },
    {
        label: 'withdraw',value: [1,4,6] 
    },
    {
        label: 'exchange',value: [2, 15, 16, 20] 
    },
    {
        label: 'investments', value: [ 7, 8, 9, 10] 
    },
    {
        label: 'rewards',value: [17, 18] 
    },
];