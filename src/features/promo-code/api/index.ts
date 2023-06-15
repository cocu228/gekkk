import $axios from "@/shared/lib/(cs)axios";
export const apiPromoCode = (code: string) => $axios.get(`/api/v1/promo-code/${code}`)
