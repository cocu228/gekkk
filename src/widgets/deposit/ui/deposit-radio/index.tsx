import { ReactNode } from "react";
import {Radio, RadioProps} from "antd";
import styles from './styles.module.scss';

interface IDepositRadio extends RadioProps {
  title: string | ReactNode,
  subtitle: string | ReactNode,
}

const DepositRadio = ({title, subtitle, value, onChange, checked, name}: IDepositRadio) => {

    return (
      <label className="flex gap-2 md:flex-col">
        <div className="wrapper">
          <Radio className={styles.Radio} name={name} value={value} checked={checked} onChange={onChange}/>
        </div>

        <div className="row">
            <p className="text-base font-medium mb-2">{title}</p>
            <p className="text-gray text-sm">{subtitle}</p>
        </div>
      </label>
    )
}

export default DepositRadio