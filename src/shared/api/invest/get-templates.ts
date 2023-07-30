import $axios, {$AxiosResponse} from "@/shared/lib/(cs)axios";

export interface ITemplateType {
    depo_type: number;
    depo_type_name: string;
    depo_min_sum: number;
    depo_max_sum: number;
    depo_coin: string;
    depo_has_link: boolean;
    depo_min_time: number;
    depo_max_time: number;
    depo_crypto_plus: number;
    depo_crypto_minus: number;
    depo_fiat_plus: number;
    depo_fiat_minus: number;
    depo_archive: number;
}

export const apiTemplates = (templates_filter: Array<number> = [3, 4]) =>
    $axios.get<$AxiosResponse<Array<ITemplateType>>>('/gek/v1/invest/get_templates', {
        params: {
            templates_filter
        }
    });
