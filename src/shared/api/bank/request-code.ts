import {$axios} from "@/shared/lib";

export interface IRequestCodeResult {
	success: boolean;
	sessid: string;
	code: string;
}

export const apiRequestCode = (
	phone: string,
	code?: string,
) => $axios.post<IRequestCodeResult>('/api/v1/requestCode', {
	phone,
	code
}, {
	baseURL: import.meta.env.VITE_BANK_API_URL,
	headers: {
		Authorization: phone,
		productId: "GEKKARD",
		applicationId: "GEKKARD"
	}
});
