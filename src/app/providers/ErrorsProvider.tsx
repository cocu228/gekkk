import {FC, memo, PropsWithChildren, useCallback, useLayoutEffect, useMemo, useState} from "react";
import $axios from "@/shared/lib/(cs)axios";
import {randomId} from "@/shared/lib/helpers";
import {useNavigate} from "react-router-dom";
import InfoBox from "@/widgets/info-box";

const ErrorsProvider: FC<PropsWithChildren<unknown>> = function (props): JSX.Element | null {

    const [errors, setErrorForState] = useState<Array<{
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
                navigate("error", {
                    state: 500
                });
                return Promise.reject(error);
            }


            setErrorForState(prevState => [...prevState, {
                id: randomId(),
                message: error.message,
                response: error.response
            }])

            // navigate("/")

            return Promise.reject(error);
        });

    }, [])

    const closeErrorMessage = (id) => setErrorForState(prevState => [...prevState.filter(it => it.id !== id)])

    return <>
        {errors.length > 0 ?
            <div className="flex z-50 flex-col items-center absolute top-[100px] left-0 right-0 m-auto">
                {errors.map((item, i) => <ErrorMessage key={"ErrorMessage" + i} id={item.id} message={item.message}
                                                       onClick={closeErrorMessage}/>)}
            </div> : null
        }
        {props.children}
    </>
}

const ErrorMessage = ({onClick, message, id}: { onClick: (val: string) => void, message: string, id: string }) => {

    return <InfoBox message={message}>
        <span onClick={() => onClick(id)}
              className="absolute right-[14px] m-auto min-h-min cursor-pointer">
        <img width={20} height={20} src="/img/icon/CloseIcon.svg" alt="close"/>
            </span>
    </InfoBox>

}

export default ErrorsProvider
