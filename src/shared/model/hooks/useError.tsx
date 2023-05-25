import React, {useState} from "react";
import {$AxiosError} from "@/shared/lib/(cs)axios";

const useError = () => {

    const [errorMessage, setIsModalOpen] = useState<string | null>(null);

    const localErrorHunter: (e: $AxiosError) => void = (error: $AxiosError) => {
        setIsModalOpen(error.message);
    };

    const localErrorSpan: JSX.Element | null = errorMessage &&
        <span className="text-fs12 text-red-800">{errorMessage}</span>

    const localErrorInfoBox: JSX.Element | null = errorMessage && <div className="info-box-warning">
        <span className="text-gray-500 font-medium">{errorMessage}</span>
    </div>


    return [localErrorHunter, localErrorSpan, localErrorInfoBox]
};

export default useError
