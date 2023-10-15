import md5 from 'md5';
import {useState} from "react";
import Loader from "@/shared/ui/loader";
import Modal from "@/shared/ui/modal/Modal";
import Input from "@/shared/ui/input/Input";
import $axios from "@/shared/lib/(cs)axios";
import Button from "@/shared/ui/button/Button";
import {MASK_CODE} from "@/shared/config/mask";
import {InternalAxiosRequestConfig} from "axios";
import useMask from "@/shared/model/hooks/useMask";
import {getCookieData} from "@/shared/lib/helpers";
import useModal from "@/shared/model/hooks/useModal";
import useError from "@/shared/model/hooks/useError";
import {apiPasswordVerify, SignHeaders} from "@/shared/api";
import {generateJWT, getTransactionSignParams} from "@/shared/lib/crypto-service";

interface IState {
	code: string;
	token: string;
	loading: boolean;
	config: InternalAxiosRequestConfig<any>;
}

export type TypeUseConfirmation = {
	confirmationModal: JSX.Element | null;
	requestConfirmation: (config: InternalAxiosRequestConfig<any>, token: string) => Promise<void>;
}

const usePinConfirmation = (): TypeUseConfirmation => {
	const [{
		code,
		token,
		config,
		loading
	}, setState] = useState<IState>({
		code: null,
		token: null,
		config: null,
		loading: false
	});
	const {onInput} = useMask(MASK_CODE);
	const {phone} = getCookieData<{phone: string}>();
	const {isModalOpen, handleCancel, showModal} = useModal();
	const [localErrorHunter, , localErrorInfoBox, localErrorClear] = useError();
	
	const requestConfirmation = async (config: InternalAxiosRequestConfig<any>, token: string) => {
		setState({
			code: null,
			token: token,
			config: config,
			loading: false
		});
		
		showModal();
	}
	
	const confirm = async () => {
		setState(prev => ({
			...prev,
			loading: true
		}));
		
		const signedRequest = async () => {
			const headers = await signHeadersGeneration(token);
			await $axios.request({
				...config,
				headers: {...headers}
			});
		}
		
		apiPasswordVerify(md5(`${code}_${phone}`))
			.then(() => signedRequest().then(handleCancel))
			.catch(() => {
				localErrorHunter({
					code: 401,
					message: "Invalid confirmation PIN"
				})
			})
		
		setState(prev => ({
			...prev,
			loading: false
		}));
	}
	
	const confirmationModal = token && <Modal
		open={true}
		title='Confirm action'
		onCancel={() => {
			handleCancel();
			localErrorClear();
		}}
	>
		{loading ? <Loader/> : <div>
			<div className="mb-4">
				<Input 
					type="text"
					onInput={onInput}
					autoComplete="off"
					placeholder="Enter your PIN"
					onChange={({target}) => {
						localErrorClear();
						setState(prev => ({
							...prev,
							code: target.value.replace(/ /g, '')
						}))
					}}
				/>
			</div>
			
			Loading: {loading.toString()}
			
			<div className='mb-4'>
				{localErrorInfoBox}
			</div>
			
			<div>
				<Button
					size={"xl"}
					disabled={!code}
					onClick={confirm}
					className="w-full"
				>Confirm</Button>
			</div>
		</div>}
	</Modal>;
	
	return ({
		confirmationModal,
		requestConfirmation
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
