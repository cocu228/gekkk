import Loader from "@/shared/ui/loader";
import InfoBox from "@/widgets/info-box";
import {logout} from "@/shared/lib/helpers";
import Button from "@/shared/ui/button/Button";
import {$axios} from "@/shared/lib/(orval)axios";
import {apiGetInfo} from "@/shared/(orval)api/gek";
import useModal from "@/shared/model/hooks/useModal";
import {useLocation, useNavigate} from "react-router-dom";
import {randomId, scrollToTop} from "@/shared/lib/helpers";
import PageProblems from "@/pages/page-problems/PageProblems";
import {FC, PropsWithChildren, useEffect, useLayoutEffect, useState} from "react";
import {CtxNeedConfirm, CtxOfflineMode} from "@/processes/errors-provider-context";
import {IStateErrorProvider, IServiceErrorProvider} from "@/processes/errors-provider-types";
import {skipList, HunterErrorsApi, hunterErrorStatus} from "@/processes/errors-provider-helpers";
import { IconApp } from "@/shared/ui/icons/icon-app";
import { Modal } from "@/shared/ui/modal/Modal";

// todo: refactor this
const ErrorsProvider: FC<PropsWithChildren & { offline: boolean }> = function ({
    offline,
    children
}): JSX.Element | null {
    const navigate = useNavigate();
    const {isModalOpen, showModal} = useModal();
    const [isAccountOpened, setAccountOpened] = useState<boolean>(true);

    const [state, setState] = useState<IStateErrorProvider>({
        errors: [],
        actionConfirmResponse: null,
        pending: {
            reject: () => {
            },
            resolve: () => {
            }
        }
    });

    useEffect(() => {
        if (isModalOpen) {
            apiGetInfo({refresh: true})
                .then(({data}) => {
                    if (!data.error) location.reload();

                    if (data.error.code === 10001) {
                        setAccountOpened(false);
                    } else {
                        navigate('/', {state: 500});
                    }
                })
        }
    }, [isModalOpen]);

    useLayoutEffect(() => {
        $axios.interceptors.response.use((response: any) => {
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
            
            if (hunterErrorsApi.isTokenReceive()) {
                return new Promise((resolve, reject) => {
                    setState(prev => ({
                        ...prev,
                        actionConfirmResponse: response,
                        pending: {
                            resolve: resolve,
                            reject: reject
                        }
                    }));
                });
            }
            
            // if (hunterErrorsApi.isConfirmationToken()) {
            //     return new Promise((resolve, reject) => {
            //         setState(prev => ({
            //             ...prev,
            //             actionConfirmResponse: response,
            //             pending: {
            //                 resolve: resolve,
            //                 reject: reject
            //             }
            //         }));
            //     })
            // }

            return response;
        }, hunterErrorStatus.bind({
            logout,
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
        <CtxOfflineMode.Provider value={{offline}}>
            <CtxNeedConfirm.Provider value={{
                pending: state.pending,
                actionConfirmResponse: state.actionConfirmResponse,
                setSuccess: () => setState(prev => ({
                    ...prev,
                    actionConfirmResponse: null
                }))
            }}>
                {children}
            </CtxNeedConfirm.Provider>
        </CtxOfflineMode.Provider>

        <Modal
            isModalOpen={isModalOpen}
            title='Account generation'
            noBorder
            closable={false}
            onCancel={() => null}
        >
            <div>
                <div className='mb-10'>
                    Your bank account is still in the creation process,
                    please wait for the account to be generated and re-authorize
                    into your Gekkard account.
                </div>

                <div className="flex w-full justify-center">
                    <Button
                        size="lg"
                        onClick={logout}
                        className="w-full"
                    >Log out</Button>
                </div>
            </div>
        </Modal>
    </>
}

const Item = ({onClick, message, id, type = "GEKKARD"}: IServiceErrorProvider) => {
    return <InfoBox
        onClick={() => onClick(id)}
        message={message}
        icon={<div className="flex justify-center w-full">
            <IconApp color="var(--gek-orange)" code="t62" size={25} className="mt-[2px]" />
        </div>}
        className={type !== "GEKKARD" ? "!bg-red-400 !text-red-400" : ""}
    />
}

export default ErrorsProvider;
