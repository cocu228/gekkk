import React, {useState} from 'react';
import Input from "@/shared/ui/input/Input";
import Button from "@/shared/ui/button/Button";
import {apiApplyCode} from "@/shared/api";

const TopUpCode = () => {

    const [input, setInput] = useState("")
    const onBtnApply = async () => {
        const response = await apiApplyCode(input)
    }
    return (<>
            <div className="row mb-8 flex items-center">
                <div className="col w-full">
                    <Input onChange={({target}) => setInput(target.value)}/>
                </div>
            </div>
            <div className="row flex items-center justify-between">
                <div className="col w-full">
                    <Button onClick={onBtnApply} size={"xl"} className="w-full">Apply</Button>
                </div>
            </div>
        </>
    )

};

export default TopUpCode;
