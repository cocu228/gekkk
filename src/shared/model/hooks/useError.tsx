import React, {useState} from "react";
import {$AxiosError} from "@/shared/lib/(orval)axios";
import {ErrorObject} from "@/shared/(orval)api/gek/model";
import { IconApp } from "@/shared/ui/icons/icon-app";

export type TypeUseError = [
    localErrorHunter: (e: $AxiosError | ErrorObject) => void,
    localErrorSpan: string | null,
    localErrorInfoBox: JSX.Element | null,
    localErrorClear: () => void,
    localIndicatorError: boolean,
]

const useError = (): TypeUseError => {

    const [errorMessage, setIsModalOpen] = useState<string | null>(null);
    const localErrorHunter: TypeUseError[0] = (error: $AxiosError | ErrorObject) => {
        setIsModalOpen(error.message);
    };
    const localErrorClear: TypeUseError[3] = () => {
        setIsModalOpen(null);
    };

    const localErrorSpan: TypeUseError[1] = errorMessage

    const localErrorInfoBox: TypeUseError[2] = errorMessage && <div className="info-box-danger w-full text-[14px] md:text-[12px]">
        <IconApp code="t56" size={20} color="#EB5454" />
        <span>{errorMessage}</span>
    </div>


    const localIndicatorError: TypeUseError[4] = errorMessage !== null


    return [localErrorHunter, localErrorSpan, localErrorInfoBox, localErrorClear, localIndicatorError]
};

export default useError
