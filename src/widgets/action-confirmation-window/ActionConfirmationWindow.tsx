import md5 from 'md5';
import Loader from "@/shared/ui/loader";
import Input from "@/shared/ui/input/Input";
import Modal from "@/shared/ui/modal/Modal";
import $axios from "@/shared/lib/(cs)axios";
import Button from "@/shared/ui/button/Button";
import {MASK_CODE} from "@/shared/config/mask";
import {apiPasswordVerify} from "@/shared/api";
import {InternalAxiosRequestConfig} from "axios";
import useMask from "@/shared/model/hooks/useMask";
import {getCookieData} from "@/shared/lib/helpers";
import {CtxRootData} from "@/processes/RootContext";
import useModal from "@/shared/model/hooks/useModal";
import useError from "@/shared/model/hooks/useError";
import {useContext, useEffect, useState} from "react";
import {CtxNeedConfirm} from "@/processes/errors-provider-context";
import {signHeadersGeneration} from "@/widgets/wallet/transfer/withdraw/model/helper";


interface IState {
    code: string;
    token: string;
    loading: boolean;
    config: InternalAxiosRequestConfig<any>;
}

const ActionConfirmationWindow = () => {
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
    const {setRefresh} = useContext(CtxRootData);
    const {phone} = getCookieData<{phone: string}>();
    const {isModalOpen, handleCancel, showModal} = useModal();
    const [localErrorHunter, , localErrorInfoBox, localErrorClear] = useError();
    const {actionConfirmResponse: response, setSuccess} = useContext(CtxNeedConfirm);
    
    useEffect(() => {
        if (response) {
            setState({
                code: null,
                loading: false,
                config: response.config,
                token: response.data.errors[0].properties.confirmationToken
            });
            
            showModal();
        }
    }, [response]);
    
    const confirm = () => {
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
        
        apiPasswordVerify(md5(`${code.replace(/ /g, '')}_${phone}`))
            .then(() => signedRequest().then(() => {
                setSuccess();
                setRefresh();
                handleCancel();
            }))
            .catch(() => {
                setState(prev => ({
                    ...prev,
                    code: null,
                    loading: false
                }));
                
                localErrorHunter({
                    code: 401,
                    message: "Invalid confirmation PIN"
                });
            });
    }
    
    return (
        <Modal
            open={isModalOpen}
            title='Confirm action'
            onCancel={() => {
                handleCancel();
                localErrorClear();
            }}
        >
            {loading && <Loader className=''/>}
            
            <div className={loading ? 'collapse' : ''}>
                <div className="mb-4">
                    <Input
                        type="text"
                        value={code}
                        onInput={onInput}
                        autoComplete="off"
                        placeholder="Enter your PIN"
                        onChange={({target}) => {
                            localErrorClear();
                            setState(prev => ({
                                ...prev,
                                code: target.value
                            }))
                        }}
                    />
                </div>
                
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
            </div>
        </Modal>
    );
}

export default ActionConfirmationWindow;
