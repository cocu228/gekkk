import React, {FC, useEffect, useRef, useState} from "react";
import {IValidatorCreator} from "@/shared/config/validators";
import {CtxInputCurrencyValid} from "@/shared/ui/input-currency/model/context";
import Decimal from "decimal.js";
import {isNull} from "@/shared/lib/helpers";
import { useTranslation } from 'react-i18next';
import { IconApp } from "@/shared/ui/icons/icon-app";

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
    value = 0,
    availableNullable = false,
    children,
    className,
    description,
    validators = [],
    onError = (value: boolean) => {}
}: IParams) => {
    const {t} = useTranslation();
    const firstEffect = useRef(true);
    const [error, setError] = useState<null | string | JSX.Element>(null);
    const [showDescription, setShowDescription] = useState(true)
    useEffect(() => {
        if (firstEffect.current) {
            firstEffect.current = false
        } else {

            if (new Decimal(value ?? 0).isZero() && !availableNullable) {
                setError(t("null_value"));
                onError(true);
            } else {
                const isValid = validators.every(validate => {
                    const result = validate(value ?? 0);
                    if (!result.validated) {
                        setError(result.errorMessage);
                        onError(true);
                        setShowDescription(true)
                        return false;
                    }
                    return true;
                });
                
                if (isValid) {
                    setError(null);
                    onError(false);
                    setShowDescription(value.toString().length === 0);
                }
            }
        }
    }, [value])
    
    return (
        <div>
            <CtxInputCurrencyValid.Provider value={!isNull(error)}>
            {children}
            <div className={className}>
                {description.length > 0 && showDescription===true && isNull(error)  ? <span className='mt-0.5 ml-[10px] text-[var(--gek-orange)]  text-fs10'>*{description}</span> :
                    <div className="flex ml-[12px] mt-[6px] gap-1 items-center">
                        {error && <div className="mt-[1px]"><IconApp color="var(--gek-orange)" code="t56" size={13}/></div>}
                        <span className='text-[var(--gek-orange)] text-fs10'>{error}</span>
                    </div>}
            </div>
            </CtxInputCurrencyValid.Provider>
        </div>
    );
});

export default Validator;
