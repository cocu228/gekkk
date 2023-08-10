import {FC, useEffect, useState} from "react";
import {IValidatorCreator} from "@/shared/config/validators";

interface IParams {
    value: string;
    className?: string;
    description?: string;
    children?: React.ReactNode;
    validators?: Array<IValidatorCreator>;
}

const Validator: FC<IParams> = (({
    value,
    children,
    className,
                                     validators = [],
    description
}: IParams) => {
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!value || value === '') {
            setError(null);
            return;
        }

        const isValid = validators.every(validate => {
            const result = validate(value);

            if (!result.validated) {
                setError(result.errorMessage);
                return false;
            }

            return true;
        });

        if (isValid) setError(null);
    }, [value, validators])

    return (
        <div className={className}>
            {children}
            {value && error
                ? <div className='mt-0.5 text-red-800'>{error}</div>
                : <div className='mt-0.5 text-green'>{description}</div>}
        </div>
    );
});

export default Validator;
