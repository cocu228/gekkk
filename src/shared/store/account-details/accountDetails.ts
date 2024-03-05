import {create} from 'zustand'
import {devtools} from "zustand/middleware";
import {ClientDetails} from "@/shared/(orval)api/gek/model";
import {apiClientDetails} from "@/shared/(orval)api/gek";

export interface IStoreAccounts {
	details: ClientDetails;
	getAccountDetails: () => Promise<ClientDetails>;
}

export const storeAccountDetails = create<IStoreAccounts>()(devtools((set) => ({
	details: null,
	getAccountDetails: async () => {

		
		const {data} = await apiClientDetails();
		console.log(data);
		
		set((state) => ({
			...state,
			details: data.result,
		}));
		return data.result;
	}
})));
