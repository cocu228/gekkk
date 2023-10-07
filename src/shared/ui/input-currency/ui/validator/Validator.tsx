import React, {FC, useEffect, useRef, useState} from "react";
import {IValidatorCreator} from "@/shared/config/validators";
import IconError from "@/shared/ui/icons/IconError";
import {CtxInputCurrencyValid} from "@/shared/ui/input-currency/model/context";
import Decimal from "decimal.js";
import {isNull} from "@/shared/lib/helpers";

interface IParams {
    value: number;
    className?: string;
    description?: string;
    availableNullable?: boolean
    children?: React.ReactNode;
    validators: Array<IValidatorCreator>;
    onError?: (value: boolean) => void;
}

const Validator: FC<IParams> = (({
    value,
    availableNullable = false,
    children,
    className,
    description,
    validators = [],
    onError = (value: boolean) => {}
}: IParams) => {

    const [error, setError] = useState<null | string | JSX.Element>(null)
    const firstEffect = useRef(true)



    useEffect(() => {

        if (firstEffect.current) {
            firstEffect.current = false

        } else {

            if (new Decimal(value).isZero() && !availableNullable) {
                setError("Null value is not allowed");
                onError(true);
                return;
            }

            const isValid = validators.every(validate => {
                const result = validate(value);
                if (!result.validated) {
                    setError(result.errorMessage);
                    onError(true);
                    return false;
                }
                return true;
            });

            if (isValid) {
                setError(null);
                onError(false);
            }
        }


    }, [value])

    return (
        <div>

            <CtxInputCurrencyValid.Provider value={!isNull(error)}>
            {children}
            <div className={className}>
                {isNull(error) ? <span className='mt-0.5 text-green text-fs12'>{description}</span>
                    : <div className="flex mt-0.5 gap-1 items-center">
                        <div className="mt-[1px]">
                            <IconError/>
                        </div>
                        <span className='text-red-800 text-fs12'>{error}</span>
                    </div>}
            </div>
            </CtxInputCurrencyValid.Provider>
        </div>
    );
});

export default Validator;
