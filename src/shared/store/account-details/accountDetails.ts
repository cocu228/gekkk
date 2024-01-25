import {create} from 'zustand'
import {devtools} from "zustand/middleware";
import {ClientDetails} from "@/shared/(orval)api/shared/model";
import {apiBankClientDetails} from "@/shared/(orval)api/shared";

export interface IStoreAccounts {
	details: ClientDetails;
	getAccountDetails: () => Promise<void>;
}

export const storeAccountDetails = create<IStoreAccounts>()(devtools((set) => ({
	details: null,
	getAccountDetails: async () => {
		const {data} = await apiBankClientDetails();
		
		set((state) => ({
			...state,
			details: data.result,
		}));
	}
})));
