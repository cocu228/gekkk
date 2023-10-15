import InfoBox from "@/widgets/info-box";
import {useLocation} from "react-router";
import {useNavigate} from "react-router-dom";
import {useAuth} from "@/app/providers/AuthRouter";
import {randomId, scrollToTop} from "@/shared/lib/helpers";
import PageProblems from "@/pages/page-problems/PageProblems";
import $axios from "@/shared/lib/(cs)axios";
import {FC, PropsWithChildren, useLayoutEffect, useState} from "react";
// import usePinConfirmation from "@/shared/model/hooks/usePinConfirmation";
import {
    IServiceErrorProvider,
    IStateErrorProvider,
    // TDataErrorProvider,
    TResponseErrorProvider
} from "@/processes/errors-provider-types";
import {HunterErrorsApi, hunterErrorStatus, skipList} from "@/processes/errors-provider-helpers";
import {CtxNeedConfirm} from "@/processes/errors-provider-context";
// import {Simulate} from "react-dom/test-utils";
// import error = Simulate.error;

const ErrorsProvider: FC<PropsWithChildren<unknown>> = function (props): JSX.Element | null {

    const {logout} = useAuth()

    if (useLocation().state === 500) {
        window.history.replaceState({}, document.title)
        return <PageProblems code={500}/>
    }

    const navigate = useNavigate();

    const [state, setState] = useState<IStateErrorProvider>({
        errors: [],
        trxConfirm: null
    });

    // const clean
    // const {confirmationModal, requestConfirmation} = usePinConfirmation();
    
    useLayoutEffect(() => {

        $axios.interceptors.response.use((response: TResponseErrorProvider) => {

            const hunterErrorsApi = new HunterErrorsApi(response)
            hunterErrorsApi.setFilterListForSkip(skipList);

            if (hunterErrorsApi.isError()) {

                const result = hunterErrorsApi.getMessageObject()

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
                setState(prev => ({...prev, trxConfirm: response.data}))
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
        
        {/*{confirmationModal}*/}
        <CtxNeedConfirm.Provider value={{
            data: state.trxConfirm,
            setSuccess: () => setState(prev => ({
                ...prev,
                trxConfirm: null
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
