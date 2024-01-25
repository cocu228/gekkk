import md5 from 'md5';
import Loader from "@/shared/ui/loader";
import Input from "@/shared/ui/input/Input";
import Modal from "@/shared/ui/modal/Modal";
import {$axios} from "@/shared/lib/(orval)axios";
import Button from "@/shared/ui/button/Button";
import {MASK_CODE} from "@/shared/config/mask";
import {apiPasswordVerify} from "@/shared/api";
import {InternalAxiosRequestConfig} from "axios";
import useMask from "@/shared/model/hooks/useMask";
import {CtxRootData} from "@/processes/RootContext";
import useModal from "@/shared/model/hooks/useModal";
import useError from "@/shared/model/hooks/useError";
import {useContext, useEffect, useState} from "react";
import {getCookieData, scrollToTop} from "@/shared/lib/helpers";
import {CtxNeedConfirm} from "@/processes/errors-provider-context";
import {pinHeadersGeneration, signHeadersGeneration} from "@/widgets/action-confirmation-window/model/helpers";
import {CtxModalTrxInfo} from "@/widgets/wallet/transfer/withdraw/model/context";
import {CtnTrxInfo} from "@/widgets/wallet/transfer/withdraw/model/entitys";
import { useTranslation } from 'react-i18next';


interface IState {
    code: string;
    token: string;
    loading: boolean;
    codeLength: number;
    type: "SIGN" | "PIN";
    config: InternalAxiosRequestConfig<any>;
}

const ActionConfirmationWindow = () => {
    const [{
        code,
        type,
        token,
        config,
        loading,
        codeLength
    }, setState] = useState<IState>({
        code: null,
        token: null,
        type: "SIGN",
        config: null,
        loading: false,
        codeLength: null
    });
    const {t} = useTranslation();
    const {onInput} = useMask(MASK_CODE);
    const {setRefresh} = useContext(CtxRootData);
    const {phone} = getCookieData<{phone: string}>();
    const {isModalOpen, handleCancel, showModal} = useModal();
    const [localErrorHunter, , localErrorInfoBox, localErrorClear] = useError();
    const {
        pending,
        setSuccess,
        actionConfirmResponse: response,
    } = useContext(CtxNeedConfirm);
    
    
    useEffect(() => {
        if (response) {
            setState({
                code: null,
                loading: false,
                config: response.config,
                type: response.config.headers['X-Confirmation-Type'],
                token: response.data.errors[0].properties.confirmationToken,
                codeLength: response.data.errors[0].properties.confirmationCodeLength
            });
            
            scrollToTop();
            showModal();
        }
    }, [response]);
    
    const confirm = () => {
        setState(prev => ({
            ...prev,
            loading: true
        }));
        
        const signedRequest = async () => {
            const headers = type === "SIGN"
                ? await signHeadersGeneration(token)
                : await pinHeadersGeneration(token, code.replace(/ /g, ''));
            
            try {
                const response = await $axios.request({
                    ...config,
                    headers: { ...headers }
                });
                
                pending.resolve(response);
                
                handleCancel();
                setSuccess();
                setRefresh();
            } catch (error) {
                handleError();
            }
        };
        
        const handleError = () => {
            setState(prev => ({
                ...prev,
                code: null,
                loading: false
            }));
            
            localErrorHunter({
                code: 401,
                message: t("invalid_confirmation_code")
            });
        };
        
        if (type === 'PIN') {
            signedRequest();
        } else {
            apiPasswordVerify(md5(`${code.replace(/ /g, '')}_${phone}`))
                .then(() => signedRequest())
                .catch(handleError);
        }
    }
    
    return (
        <Modal
            open={isModalOpen}
            title={t("confirm_action")}
            onCancel={() => {
                handleCancel();
                localErrorClear();
            }}
        >
            {loading && <Loader className=''/>}
            
            <div className={loading ? 'collapse' : ''}>
                <div className="row -mt-5 mb-2">
                    <div className="col">
                        <span className='text-gray-600'>To confirm the operation, you should enter {type === 'SIGN'
                            ? 'your PIN'
                            : 'SMS code'}:</span>
                    </div>
                </div>
                
                <div className="mb-4">
                    <Input
                        type="text"
                        value={code}
                        onInput={onInput}
                        maxLength={type === "PIN"
                            ? codeLength * 2 - 2
                            : null
                        }
                        autoComplete="off"
                        placeholder={type === 'SIGN'
                            ? 'Enter your PIN'
                            : 'Enter SMS code'
                        }
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
                        className="w-full mt-4"
                    >{t("confirm")}</Button>
                </div>
            </div>
        </Modal>
    );
}

export default ActionConfirmationWindow;
