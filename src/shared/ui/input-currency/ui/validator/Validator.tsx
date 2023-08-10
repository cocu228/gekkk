import {FC, useEffect, useState} from "react";
import {IValidatorCreator} from "@/shared/config/validators";
import IconError from "@/shared/ui/icons/IconError";

interface IParams {
    value: string;
    className?: string;
    description?: string;
    children?: React.ReactNode;
    validators: Array<IValidatorCreator>;
    onError?: (value: boolean) => void;
}

const Validator: FC<IParams> = (({
    value,
    children,
    className,
    description,
    validators = [],
    onError
}: IParams) => {
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!value || value === '') {
            setError(null);
            onError(false);
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
    }, [value, validators])

    return (
        <div>
            {children}

            <div className={className}>
                {!(value && error)
                    ? <span className='mt-0.5 text-green'>{description}</span>
                    : <div className="flex mt-0.5 gap-1">
                        <div className="mt-[1px]">
                            <IconError/>
                        </div>

                        <span className='text-red-800'>{error}</span>
                    </div>
                }
            </div>
        </div>
    );
});

export default Validator;
