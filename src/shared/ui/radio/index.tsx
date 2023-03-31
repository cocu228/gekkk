import { ReactNode } from "react";
import {Radio as RadioAntd, RadioProps} from "antd";
import styles from './styles.module.scss';

interface IRadio extends RadioProps {
  title: string | ReactNode,
  subtitle: string | ReactNode,
}

const Radio = ({title, subtitle, value, onChange, checked, name}: IRadio) => {

    return (
      <label className="flex gap-2 xl:flex-col">
        <div className="wrapper">
          <RadioAntd className={styles.Radio} name={name} value={value} checked={checked} onChange={onChange}/>
        </div>

        <div className="row">
            <p className="text-base font-medium mb-2 md:text-sm md:mb-1">{title}</p>
            <p className="text-gray-400 text-sm md:text-xs">{subtitle}</p>
        </div>
      </label>
    )
}

export default Radio