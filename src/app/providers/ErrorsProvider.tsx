import {FC, memo, PropsWithChildren, useCallback, useLayoutEffect, useMemo, useState} from "react";
import $axios from "@/shared/lib/(cs)axios";
import {randomId} from "@/shared/lib/helpers";
import {useNavigate} from "react-router-dom";

const ErrorsProvider: FC<PropsWithChildren<unknown>> = function (props): JSX.Element | null {

    const [errors, setErrorForState] = useState<Array<{
        id: string,
        message: string,
        response: Record<string, unknown>
    }>>([])

    useLayoutEffect(() => {

        $axios.interceptors.response.use(function (response) {
            return response;
        }, function (error) {

            setErrorForState(prevState => [...prevState, {
                id: randomId(),
                message: error.message,
                response: error.response
            }])

            useNavigate()("/")

            return Promise.reject(error);
        });

    }, [])

    const closeErrorMessage = (id) => useCallback(() => {
        setErrorForState(prevState => [...prevState.filter(it => it.id !== id)])
    }, [id])

    return <>
        {errors.length > 0 ?
            <div className="flex z-50 flex-col items-center absolute top-[24px] left-0 right-0 m-auto">
                {errors.map((item, i) => <ErrorMessage key={"ErrorMessage" + i} id={item.id} message={item.message}
                                                       onClick={closeErrorMessage}/>)}
            </div>
            :
            null
        }
        {props.children}
    </>
}

const ErrorMessage = ({onClick, message, id}: { onClick: (val: string) => void, message: string, id: string }) => {

    return <div className="flex justify-center items-center relative rounded-xl m-1 w-[400px] min-h-[40px] bg-gray">
        <span onClick={() => onClick(id)}
              className="absolute right-[24px] m-auto min-h-min cursor-pointer">
        <img width={20} height={20} src="/img/icon/CloseIcon.svg" alt="close"/>
            </span>
        <p>{message}</p>
    </div>
}

export default ErrorsProvider
