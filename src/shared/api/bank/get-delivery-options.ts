import {$axios} from "@/shared/lib/(orval)axios";

export interface IDeliveryOption {
    id: number;
    country: string;
    countryCode: string;
    cost: number;
    deliveryDays: number;
    active: boolean;
    legalCostWithTin: number;
    legalCostWithoutTin: number;
}

export const apiDeliveryOptions = () =>
    $axios.get<IDeliveryOption[]>('/api/v1/cards/delivery/option', {
        baseURL: import.meta.env.VITE_BANK_API_URL,
    });
