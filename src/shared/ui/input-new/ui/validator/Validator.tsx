interface IParams {
    value: string;
    className?: string;
    children?: React.ReactNode;
    validator: (value: string) => JSX.Element | string;
}

export default (({value, validator, className, children}: IParams) => { 
    return (
        <div className={className}>
            {children}

            <div className='mt-0.5 text-red-800'>{validator(value)}</div>
        </div>
    );
});
