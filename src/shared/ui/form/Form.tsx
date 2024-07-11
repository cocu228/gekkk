import { FormHTMLAttributes, memo, PropsWithChildren } from "react";

interface Props extends FormHTMLAttributes<HTMLFormElement> {
  title?: string;
  subtitle?: string;
  wrapperClassName?: string;
  onSubmit: () => void;
}

const Form = memo<PropsWithChildren<Props>>(
  ({ title, subtitle, onSubmit, wrapperClassName = "", children, ...props }): JSX.Element | null => (
    <div className={`${wrapperClassName} flex flex-col gap-24`}>
      {(title || subtitle) && (
        <div className='flex flex-col row-gap-4'>
          <h3 className='text-xl font-bold'>{title}</h3>
          {subtitle && <span className='mt-1 text-base leading-4 text-gray-200'>{subtitle}</span>}
        </div>
      )}

      <form
        onSubmit={e => {
          e.preventDefault();
          onSubmit();
        }}
        className='flex flex-col gap-2'
        {...props}
      >
        {children}
      </form>
    </div>
  )
);

export default Form;
