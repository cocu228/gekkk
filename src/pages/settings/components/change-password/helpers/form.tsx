import { FormEvent, ReactNode } from "react";

import style from "./form.module.css";

interface Props {
  action?: string;
  children: ReactNode;
  className?: string;
  onSubmit: (data: FormData) => void;
}

const Form = ({ action, children, className, onSubmit }: Props) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const formElement = e.target as HTMLFormElement;
    const isValid = formElement.checkValidity();

    formElement.classList.add(style.submitted);

    // focusing the first invalid field
    const firstInvalidField = formElement.querySelector<HTMLElement>(":invalid");

    firstInvalidField?.focus();

    // submit the dataObject if isValid===true
    if (isValid) {
      const dataObject = new FormData(formElement);
      onSubmit(dataObject);
    }
  };

  return (
    <form
      action={action}
      onSubmit={handleSubmit}
      noValidate
      autoComplete={"off"}
      className={`${style.form} ${className}`}
    >
      {children}
    </form>
  );
};

export default Form;
