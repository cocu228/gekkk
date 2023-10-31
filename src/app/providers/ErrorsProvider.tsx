import InfoBox from "@/widgets/info-box";
import {useLocation} from "react-router";
import {useNavigate} from "react-router-dom";
import {useAuth} from "@/app/providers/AuthRouter";
import {randomId, scrollToTop} from "@/shared/lib/helpers";
import PageProblems from "@/pages/page-problems/PageProblems";
import $axios from "@/shared/lib/(cs)axios";
import {FC, PropsWithChildren, useLayoutEffect, useState} from "react";
import {
    IServiceErrorProvider,
    IStateErrorProvider,
    TResponseErrorProvider
} from "@/processes/errors-provider-types";
import {HunterErrorsApi, hunterErrorStatus, skipList} from "@/processes/errors-provider-helpers";
import {CtxNeedConfirm} from "@/processes/errors-provider-context";
import {apiGetAccountInfo} from "@/shared/api";

const ErrorsProvider: FC<PropsWithChildren> = function (props): JSX.Element | null {

    const {logout} = useAuth()

    if (useLocation().state === 500) {
        window.history.replaceState({}, document.title)
        return <PageProblems code={500}/>
    }

    const navigate = useNavigate();

    const [state, setState] = useState<IStateErrorProvider>({
        errors: [],
        actionConfirmResponse: null,
        pending: {
            reject: () => {},
            resolve: () => {}
        }
    });

    useLayoutEffect(() => {

        $axios.interceptors.response.use((response: TResponseErrorProvider) => {

            const hunterErrorsApi = new HunterErrorsApi(response)
            hunterErrorsApi.setFilterListForSkip(skipList);

            if (hunterErrorsApi.isNewWallet()) {
                apiGetAccountInfo(true)
                    .then(() => location.reload());
            }

            if (hunterErrorsApi.isError()) {
                
                const result = hunterErrorsApi.getMessageObject()

                if (result.error.code === 10001) return response;
                
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

                scrollToTop()
            }

            if (hunterErrorsApi.isAuthExpired()) logout()

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

            return response

        }, hunterErrorStatus.bind({
            navigate: navigate,
            setState: setState
        }));

    }, [])

    const onClose = (id: string) => setState(prevState => ({
        ...prevState,
        errors: [...prevState.errors.filter(it => it.id !== id)]
    }))

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
