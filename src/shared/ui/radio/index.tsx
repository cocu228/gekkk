import React from "react";

import styles from "./styles.module.scss";

type RadioChangeEvent = React.ChangeEvent<{ value: string }>;

interface RadioButtonProps {
  checked?: boolean;
  title: string;
  name: string;
  subtitle: string | JSX.Element;
  value: string;
  label: string;
  onChange: (e: RadioChangeEvent) => void;
}

const Radio = ({ title, subtitle, value, onChange, checked, name }: RadioButtonProps) => (
  <label htmlFor={value} className='inline-flex flex-row gap-2 cursor-pointer'>
    <input
      type={"radio"}
      id={value}
      className={styles.Radio}
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
    />
    <span />
    <div className='row'>
      <p className='text-base font-medium mb-2 md:text-sm md:mb-1'>{title}</p>
      <p className='text-gray-400 text-sm md:text-xs'>{subtitle}</p>
    </div>
  </label>
);

export default Radio;
