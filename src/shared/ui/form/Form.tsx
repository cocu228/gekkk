import {memo, PropsWithChildren} from 'react';
import {Form as FormAntd, FormProps} from 'antd';

interface Props extends FormProps {
    title?: string;
    subtitle?: string;
    wrapperClassName?: string;
}

const Form = memo<PropsWithChildren<Props>>(
    ({title, subtitle, wrapperClassName = '', children, ...props}): JSX.Element | null => {
        return (
            <div className={`${wrapperClassName} flex flex-col gap-24`}>
                {(title || subtitle) && <div className="flex flex-col row-gap-4">
                    <h3 className="text-xl font-bold">{title}</h3>
                    {subtitle && <span className="mt-1 text-base leading-4 text-gray-200">{subtitle}</span>}
                </div>}

                <FormAntd className="flex flex-col gap-2" {...props}>
                    {children}
                </FormAntd>
            </div>
        );
    },
);

export default Form;
