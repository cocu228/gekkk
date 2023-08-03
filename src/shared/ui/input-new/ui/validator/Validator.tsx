import {useEffect, useState} from "react";
import {IValidationResult} from "@/shared/config/validators";

interface IParams {
    value: string;
    className?: string;
    description?: string;
    children?: React.ReactNode;
    validators: Array<(value: string) => IValidationResult>;
}

export default (({
    value,
    children,
    className,
    validators,
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
