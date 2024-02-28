import {create} from 'zustand'
import {devtools} from "zustand/middleware";
import {ClientDetails} from "@/shared/(orval)api/gek/model";
import {apiClientDetails} from "@/shared/(orval)api/gek";

export interface IStoreAccounts {
	getAccountDetails: () => Promise<ClientDetails>;
}

export const storeAccountDetails = create<IStoreAccounts>()(devtools((setState, getState) => ({
	details: null,
	getAccountDetails: async () => {
		// @ts-ignore
		const {details} = getState();
		
		const {data} = details
			? {data: {result: details}}
			: await apiClientDetails();

		setState((state) => ({
			...state,
			details: data.result,
		}));

		return data.result;
	}
})));
