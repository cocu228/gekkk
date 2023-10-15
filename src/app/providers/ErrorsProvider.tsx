import InfoBox from "@/widgets/info-box";
import {useLocation} from "react-router";
import {useNavigate} from "react-router-dom";
import {useAuth} from "@/app/providers/AuthRouter";
import {isNull, scrollToTop, uncoverArray} from "@/shared/lib/helpers";
import PageProblems from "@/pages/page-problems/PageProblems";
import $axios from "@/shared/lib/(cs)axios";
import {FC, PropsWithChildren, useLayoutEffect, useState} from "react";
import usePinConfirmation from "@/shared/model/hooks/usePinConfirmation";
import {IServiceErrorProvider, IStateErrorProvider, TResponseErrorProvider} from "@/processes/types-errors-provider";
import {HunterErrorsApi, hunterErrorStatus, skipList} from "@/processes/helpers-errors-provider";

const ErrorsProvider: FC<PropsWithChildren<unknown>> = function (props): JSX.Element | null {

    const {logout} = useAuth()

    if (useLocation().state === 500) {
        window.history.replaceState({}, document.title)
        return <PageProblems code={500}/>
    }

    const navigate = useNavigate();
    const [state, setState] = useState<Array<IStateErrorProvider>>([]);
    const {confirmationModal, requestConfirmation} = usePinConfirmation();
    
    useLayoutEffect(() => {

        $axios.interceptors.response.use((response: TResponseErrorProvider) => {

            const hunterErrorsApi = new HunterErrorsApi(response)
            hunterErrorsApi.setFilterListForSkip(skipList);

            if (hunterErrorsApi.isError()) {
                const item: IStateErrorProvider = hunterErrorsApi.getMessageObject()

                !isNull(item) && setState(prevState => [...prevState, item])
                scrollToTop()

            }

            if (hunterErrorsApi.isAuthExpired()) logout()

            // if (hunterErrorsApi.isConfirmationToken()) requestConfirmation(response)

            return response

        }, hunterErrorStatus.bind({
            navigate: navigate,
            setState: setState
        }));

    }, [])

    const onClose = (id) => setState(prevState => [...prevState.filter(it => it.id !== id)])

    return <>
        {<div className="flex z-50 flex-col items-center absolute top-[100px] left-0 right-0 m-auto">
            {state.map((item, i) =>
                <Item key={"ErrorMessage" + i} id={item.id} message={item.message} onClick={onClose}/>)
            }
        </div>}
        
        {confirmationModal}
        
        {props.children}
    </>
}

const Item = ({onClick, message, id}: IServiceErrorProvider) => {
    return <InfoBox message={message}>
        <span onClick={() => onClick(id)}
              className="absolute right-[14px] m-auto min-h-min cursor-pointer"
        >
            <img width={20} height={20} src="/img/icon/CloseIcon.svg" alt="close"/>
        </span>
    </InfoBox>
}

export default ErrorsProvider;
