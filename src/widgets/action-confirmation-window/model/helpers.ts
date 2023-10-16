﻿import {SignHeaders} from "@/shared/api";
import {getCookieData} from "@/shared/lib/helpers";
import {generateJWT, getTransactionSignParams} from "@/shared/lib/crypto-service";

export const pinHeadersGeneration = async (
	token: string | null = null,
	code: string
): Promise<Partial<SignHeaders>> => {
	const header: Pick<SignHeaders, "X-Confirmation-Type"> = {
		"X-Confirmation-Type": "PIN"
	}
	
	if (token === null) return header;
	
	const keys: Omit<SignHeaders, "X-Confirmation-Type"> = {
		"X-Confirmation-Code": code,
		"X-Confirmation-Token": token
	};
	
	return ({
		...header,
		...keys
	});
}

export const signHeadersGeneration = async (
	token: string | null = null
): Promise<Partial<SignHeaders>> => {
	const header: Pick<SignHeaders, "X-Confirmation-Type"> = {
		"X-Confirmation-Type": "SIGN"
	}
	
	if (token === null) return header;
	
	const {
		appUuid,
		appPass
	} = token ? await getTransactionSignParams() : {appUuid: null, appPass: null};
	
	const jwtPayload = {
		confirmationToken: token,
		exp: Date.now() + 0.5 * 60 * 1000, // + 30sec
		initiator: getCookieData<{ phone: string }>().phone
	};
	
	const keys: Omit<SignHeaders, "X-Confirmation-Type"> = {
		"X-App-Uuid": appUuid,
		"X-Confirmation-Token": token,
		"X-Confirmation-Code": generateJWT(jwtPayload, appPass)
	};
	
	return ({
		...header,
		...keys
	});
}
