import md5 from 'md5';
import {useState} from "react";
import Modal from "@/shared/ui/modal/Modal";
import Input from "@/shared/ui/input/Input";
import $axios from "@/shared/lib/(cs)axios";
import Button from "@/shared/ui/button/Button";
import {getCookieData} from "@/shared/lib/helpers";
import useModal from "@/shared/model/hooks/useModal";
import {apiPasswordVerify, SignHeaders} from "@/shared/api";
import {AxiosResponse, InternalAxiosRequestConfig} from "axios";
import {generateJWT, getTransactionSignParams} from "@/shared/lib/crypto-service";

interface IState {
	code: string;
	token: string;
	config: InternalAxiosRequestConfig<any>;
}

export type TypeUseConfirmation = {
	isConfirmationRequired: boolean;
	confirmationModal: JSX.Element | null;
	confirmRequest: (request: (params: object) => Promise<AxiosResponse<any>>, params: unknown) => void;
}

const usePinConfirmation = (): TypeUseConfirmation => {
	const [{
		code,
		token,
		config
	}, setState] = useState<IState>({
		code: null,
		token: null,
		config: null
	});
	const {phone} = getCookieData<{phone: string}>();
	const {isModalOpen, handleCancel, showModal} = useModal();
	
	const confirmRequest = async (request: (params: object) => Promise<AxiosResponse<any>>, params: object) => {
		const headers = await signHeadersGeneration(token);
		
		const response = await request({
			...params,
			...headers
		});
		
		setState(prev => ({
			...prev,
			config: response.config,
			token: response.data?.errors[0]?.properties['confirmationToken']
		}));
		showModal();
	}
	
	const isConfirmationRequired = token !== null;
	
	const confirmationModal = token && <Modal
		open={isModalOpen}
		onCancel={handleCancel}
		title='Confirm action'>
        <Input type="text"
               placeholder="Enter your PIN"
               className="mb-4"
               onChange={({target}) => setState(prev => ({
	               ...prev,
	               code: target.value
               }))}
               autoComplete="off"
        />
		
        <Button size={"xl"}
                className="w-full"
                onClick={() => {
					(async () => {
						const verifyResponse = apiPasswordVerify(md5(`${code}_${phone}`))
						$axios.request({
							...config,
							headers: {
								...(await signHeadersGeneration(token))
							}
						})
					})()
                }}
                disabled={!code}
        >Confirm</Button>
	</Modal>;
	
	return ({
		isConfirmationRequired,
		confirmationModal,
		confirmRequest
	});
};

export default usePinConfirmation;


const signHeadersGeneration = async (token: string | null = null): Promise<Partial<SignHeaders>> => {
	
	const header: Pick<SignHeaders, "X-Confirmation-Type"> = {
		"X-Confirmation-Type": "SIGN",
	}
	
	if (token === null) return header
	
	const {
		appUuid,
		appPass
	} = token ? await getTransactionSignParams() : {appUuid: null, appPass: null};
	
	
	const jwtPayload = {
		initiator: getCookieData<{ phone: string }>().phone,
		confirmationToken: token,
		exp: Date.now() + 0.5 * 60 * 1000 // + 30sec
	};
	
	
	const keys: Omit<SignHeaders, "X-Confirmation-Type"> = {
		"X-Confirmation-Code": generateJWT(jwtPayload, appPass),
		"X-Confirmation-Token": token,
		"X-App-Uuid": appUuid
	}
	
	return {
		...header,
		...keys
	}
	
}
