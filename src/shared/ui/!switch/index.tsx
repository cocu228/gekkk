import {FC, useState} from 'react'
import style from './styles.module.scss'

interface SwitchProps {
    onChange?: (state: boolean) => void;
    defaultCheked?: boolean
    className?: string;
    alwaysOn?: boolean
}

export const Switch:FC<SwitchProps> = ({onChange, defaultCheked, className, alwaysOn}) => {
    const [isCheked, setIsChecked] = useState(defaultCheked)

    const switchHandler = () => {
        setIsChecked(!isCheked)
        onChange(isCheked)
    }

    return (
        <div
            onClick={switchHandler}
            className={`${style.SwitchWrap} ${alwaysOn && style.SwitchAlwaysOn} ${isCheked && style.SwitchWrapActive} ${className}`}
          >
            <div
              className={`${style.SwitchItem} ${isCheked && style.SwitchItemActive}`}
            ></div>
          </div>
    )
}