import {FC, PropsWithChildren, useLayoutEffect, useMemo, useState} from "react";
import $axios, {$AxiosResponse} from "@/shared/lib/(cs)axios";
import {randomId, scrollToTop} from "@/shared/lib/helpers";
import {useNavigate} from "react-router-dom";
import InfoBox from "@/widgets/info-box";
import {useLocation} from "react-router";
import PageProblems from "@/pages/page-problems/PageProblems";
import {AxiosResponse} from "axios";
import {useAuth} from "@/app/providers/AuthRouter";


interface IState {
    id: string,
    message: string,
    response: Record<string, unknown>
}

interface IItem {
    onClick: (val: string) => void,
    message: string,
    id: string
}

function hunter(error) {
    if (error.response?.status === 500) {

        this.navigate("/", {
            state: 500
        });

        return Promise.reject(error);
    }

    if (error.code === "ERR_CANCELED") return Promise.reject(error)


    this.setState(prevState => [...prevState, {
        id: randomId(),
        message: error.message,
        response: error.response
    }])

    // navigate("/")

    return Promise.reject(error);
}

const ErrorsProvider: FC<PropsWithChildren<unknown>> = function (props): JSX.Element | null {

    const {logout} = useAuth()

    if (useLocation().state === 500) {
        window.history.replaceState({}, document.title)
        return <PageProblems code={500}/>
    }

    const [state, setState] = useState<Array<IState>>([])

    const navigate = useNavigate()

    useLayoutEffect(() => {

        $axios.interceptors.response.use((response: AxiosResponse<$AxiosResponse<Record<string, unknown> | null | unknown>>) => {

            if (response.data.result === null && response.data.error !== null) {

                if (response.data.error.code === 10006) return response;
                if (response.data.error.code === 10007) return response;
                if (response.data.error.code === 10016) return response;
                if (response.data.error.code === 10024) return response;
                if (response.data.error.code === 10039) return response;
                if (response.data.error.code === 10047) return response;
                if (response.data.error.code === 10047) return response;
                if (response.data.error.code === 10064) return response;
                if (response.data.error.code === 10035) return response;
                if (response.data.error.code === 10054) return response;
                if (response.data.error.code === 10065) logout();

                const message: string = response.data.error.message
                const id: string = randomId()
                const res: Record<string, unknown> = response.data

                setState(prevState => [...prevState, {message, id, response: res}])
                scrollToTop()
            }

            return response

        }, hunter.bind({
            navigate: navigate,
            setState: setState
        }));

    }, [])

    const onClose = (id) => setState(prevState => [...prevState.filter(it => it.id !== id)])

    return <>
        {<div
            className="flex z-50 flex-col items-center absolute top-[100px] left-0 right-0 m-auto">{state.map((item, i) =>
            <Item key={"ErrorMessage" + i} id={item.id} message={item.message} onClick={onClose}/>)}</div>}
        {props.children}
    </>
}

const Item = ({onClick, message, id}: IItem) => {
    return <InfoBox message={message}>
        <span onClick={() => onClick(id)}
              className="absolute right-[14px] m-auto min-h-min cursor-pointer">
        <img width={20} height={20} src="/img/icon/CloseIcon.svg" alt="close"/>
            </span>
    </InfoBox>

}

export default ErrorsProvider
