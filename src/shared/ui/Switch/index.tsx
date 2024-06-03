import {FC, useState} from 'react'
import style from './styles.module.scss'

interface SwitchProps {
    onChange?: (state: boolean) => void;
    defaultCheked?: boolean
    className?: string;
    disabled?: boolean
}

export const Switch:FC<SwitchProps> = ({onChange, defaultCheked, className, disabled = false}) => {
    const [isCheked, setIsChecked] = useState(defaultCheked)

    const switchHandler = () => {
      setIsChecked(!isCheked)
      onChange(isCheked)
    }

    return (
      <div
        onClick={switchHandler}
        className={`${style.SwitchWrap} ${disabled && style.SwitchDisabled} ${isCheked && style.SwitchWrapActive} ${className}`}
      >
        <div
          className={`${style.SwitchItem} ${isCheked && style.SwitchItemActive}`}
        ></div>
      </div>
    )
}
