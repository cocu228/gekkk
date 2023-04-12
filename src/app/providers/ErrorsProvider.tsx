import {FC, memo, PropsWithChildren, useCallback, useLayoutEffect, useMemo, useState} from "react";
import $axios from "@/shared/lib/(cs)axios";
import {randomId} from "@/shared/lib/helpers";
import {useNavigate} from "react-router-dom";
import InfoBox from "@/widgets/info-box";
import {useLocation} from "react-router";
import PageProblems from "@/pages/page-problems/PageProblems";

const ErrorsProvider: FC<PropsWithChildren<unknown>> = function (props): JSX.Element | null {


    if (useLocation().state === 500) {
        window.history.replaceState({}, document.title)
        return <PageProblems code={500}/>
    }

    const [state, setState] = useState<Array<{
        id: string,
        message: string,
        response: Record<string, unknown>
    }>>([])

    const navigate = useNavigate()

    useLayoutEffect(() => {

        $axios.interceptors.response.use(function (response) {

            return response;

        }, function (error) {

            if (error.response?.status === 500) {

                navigate("/", {
                    state: 500
                });

                return Promise.reject(error);
            }


            setState(prevState => [...prevState, {
                id: randomId(),
                message: error.message,
                response: error.response
            }])

            // navigate("/")

            return Promise.reject(error);

        });

    }, [])

    const onClose = (id) => setState(prevState => [...prevState.filter(it => it.id !== id)])

    return <>
        {<div
            className="flex z-50 flex-col items-center absolute top-[100px] left-0 right-0 m-auto">{state.map((item, i) =>
            <Item key={"ErrorMessage" + i} id={item.id} message={item.message} onClick={onClose}/>)}</div>}
        {props.children}
    </>
}

const Item = ({onClick, message, id}: { onClick: (val: string) => void, message: string, id: string }) => {

    return <InfoBox message={message}>
        <span onClick={() => onClick(id)}
              className="absolute right-[14px] m-auto min-h-min cursor-pointer">
        <img width={20} height={20} src="/img/icon/CloseIcon.svg" alt="close"/>
            </span>
    </InfoBox>

}

export default ErrorsProvider
