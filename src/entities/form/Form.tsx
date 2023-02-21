import {memo, PropsWithChildren} from 'react';
import {Form as FormAntd, FormProps} from 'antd';

interface Props extends FormProps {
    title: string;
    subtitle?: string;
    wrapperClassName?: string;
}

const Form = memo<PropsWithChildren<Props>>(
    ({title, subtitle, wrapperClassName = '', children, ...props}): JSX.Element | null => {
        return (
            <div className={`${wrapperClassName} d-flex flex-column gap-24`}>
                <div className="d-flex flex-column row-gap-4">
                    <h3 className="fs-20 fw-bold">{title}</h3>

                    {subtitle && <span className="mt-1 fs-16 lh-base text-gray">{subtitle}</span>}
                </div>

                <FormAntd className="d-flex flex-column gap-8" {...props}>
                    {children}
                </FormAntd>
            </div>
        );
    },
);

export default Form;
