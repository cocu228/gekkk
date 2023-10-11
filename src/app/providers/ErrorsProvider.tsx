import {FC, PropsWithChildren, useLayoutEffect, useMemo, useState} from "react";
import $axios, {$AxiosResponse} from "@/shared/lib/(cs)axios";
import {getCookieData, randomId, scrollToTop} from "@/shared/lib/helpers";
import {useNavigate} from "react-router-dom";
import InfoBox from "@/widgets/info-box";
import {useLocation} from "react-router";
import PageProblems from "@/pages/page-problems/PageProblems";
import axios, {AxiosRequestHeaders, AxiosResponse, InternalAxiosRequestConfig} from "axios";
import {useAuth} from "@/app/providers/AuthRouter";
import Modal from "@/shared/ui/modal/Modal";
import useModal from "@/shared/model/hooks/useModal";
import {signHeadersGeneration} from "@/widgets/wallet/transfer/withdraw/model/helper";
import FormItem from "@/shared/ui/form/form-item/FormItem";
import Input from "@/shared/ui/input/Input";
import Button from "@/shared/ui/button/Button";
import {apiPasswordVerify} from "@/shared/api";


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

    const navigate = useNavigate();
    const confirmActionModal = useModal();
    const {phone} = getCookieData<{phone: string}>();
    const [state, setState] = useState<Array<IState>>([]);
    const [confirmationPin, setConfirmationPin] = useState(null);
    const [confirmRequestCfg, setConfirmRequestCfg] = useState(null);
    
    const actionConfirm = async () => {
        //const verifyResponse = apiPasswordVerify(md5(`${confirmationPin}_${phone}`))
        //const response = await $axios.request(confirmRequestCfg);
        
        
    }

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
            
            // if (response.data['errors'] && response.data['errors'][0].code === 449) {
            //     const config = response.config;
            //    
            //     signHeadersGeneration(response.data['errors'][0].properties['confirmationToken'])
            //         .then(headers => {
            //             Object.assign(config.headers, headers)
            //            
            //             setConfirmRequestCfg(config);
            //             confirmActionModal.showModal();
            //         })
            // }

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
        
        <Modal
            title={'Confirm action'}
            open={confirmActionModal.isModalOpen}
            onCancel={confirmActionModal.handleCancel}
        >
            <Input type="text"
                   placeholder="Enter your PIN"
                   className="mb-4"
                   onChange={({target}) => setConfirmRequestCfg(target.value)}
                   autoComplete="off"
            />
            
            <Button size={"xl"}
                    className="w-full"
                    onClick={() => $axios.request(confirmRequestCfg)}
            >Confirm</Button>
        </Modal>
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
