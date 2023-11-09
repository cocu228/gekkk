import Loader from "@/shared/ui/loader";
import InfoBox from "@/widgets/info-box";
import {useLocation} from "react-router";
import Modal from "@/shared/ui/modal/Modal";
import $axios from "@/shared/lib/(cs)axios";
import {useNavigate} from "react-router-dom";
import {apiGetAccountInfo} from "@/shared/api";
import {useAuth} from "@/app/providers/AuthRouter";
import useModal from "@/shared/model/hooks/useModal";
import {randomId, scrollToTop} from "@/shared/lib/helpers";
import PageProblems from "@/pages/page-problems/PageProblems";
import {CtxNeedConfirm} from "@/processes/errors-provider-context";
import {FC, PropsWithChildren, useEffect, useLayoutEffect, useState} from "react";
import {skipList, HunterErrorsApi, hunterErrorStatus} from "@/processes/errors-provider-helpers";
import {IStateErrorProvider, IServiceErrorProvider, TResponseErrorProvider} from "@/processes/errors-provider-types";

// todo: refactor this
const ErrorsProvider: FC<PropsWithChildren> = function (props): JSX.Element | null {
    const {logout} = useAuth();
    const navigate = useNavigate();
    const {isModalOpen, showModal, handleCancel} = useModal();

    const [state, setState] = useState<IStateErrorProvider>({
        errors: [],
        actionConfirmResponse: null,
        pending: {
            reject: () => {},
            resolve: () => {}
        }
    });

    useEffect(() => {
        if (isModalOpen) {
            apiGetAccountInfo(true)
                .then(({data}) => {
                    if (!data.error) location.reload();

                    navigate('/', {state: 500});
                })
        }
    }, [isModalOpen]);

    useLayoutEffect(() => {
        $axios.interceptors.response.use((response: TResponseErrorProvider) => {
            const hunterErrorsApi = new HunterErrorsApi(response);
            hunterErrorsApi.setFilterListForSkip(skipList);

            if (hunterErrorsApi.isNewWallet()) {
                showModal();
            }

            if (hunterErrorsApi.isError()) {
                const result = hunterErrorsApi.getMessageObject();
                
                setState(prevState => ({
                    ...prevState,
                    errors: [
                        ...prevState.errors,
                        {
                            id: randomId(),
                            message: result.error.message,
                            code: result.error.code,
                            type: result.error.type
                        }
                    ]
                }));

                scrollToTop();
            }

            if (hunterErrorsApi.isAuthExpired()) logout();

            if (hunterErrorsApi.isConfirmationToken()) {
                return new Promise((resolve, reject) => {
                    setState(prev => ({
                        ...prev,
                        actionConfirmResponse: response,
                        pending: {
                            resolve: resolve,
                            reject: reject
                        }
                    }));
                })
            }

            return response;
        }, hunterErrorStatus.bind({
            navigate: navigate,
            setState: setState
        }));
    }, []);

    const onClose = (id: string) => setState(prevState => ({
        ...prevState,
        errors: [...prevState.errors.filter(it => it.id !== id)]
    }));

    if (useLocation().state === 500) {
        window.history.replaceState({}, document.title);
        return (<PageProblems code={500}/>);
    }

    return <>
        {<div className="flex z-50 flex-col items-center absolute top-[100px] left-0 right-0 m-auto">
            {state.errors.map((item, i) =>
                <Item key={"ErrorMessage" + i} id={item.id} message={item.message} type={item.type} onClick={onClose}/>)
            }
        </div>}
        
        <CtxNeedConfirm.Provider value={{
            pending: state.pending,
            actionConfirmResponse: state.actionConfirmResponse,
            setSuccess: () => setState(prev => ({
                ...prev,
                actionConfirmResponse: null
            }))
        }}>
            {props.children}
        </CtxNeedConfirm.Provider>
        
        <Modal
            title='Account generation'
            open={isModalOpen}
            onCancel={handleCancel}
        >
            <div>
                <div className='mb-10'>
                    This is your first time logging in to Gekkard and you do not have any accounts created yet.
                    Please wait, we are creating a new account for you. The process may take a few minutes...
                </div>
                
                <Loader className='relative'/>
            </div>
        </Modal>
    </>
}

const Item = ({onClick, message, id, type = "GEKKARD"}: IServiceErrorProvider) => {
    return <InfoBox className={type !== "GEKKARD" ? "!bg-red-400 !text-red-400" : ""} message={message}>
        <span onClick={() => onClick(id)} className="absolute right-[14px] m-auto min-h-min cursor-pointer">
            <img width={20} height={20} src="/img/icon/CloseIcon.svg" alt="close"/>
        </span>
    </InfoBox>
}

export default ErrorsProvider;
