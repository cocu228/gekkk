import {FC, MutableRefObject, useEffect, useRef, useState} from 'react'
import styles from './styles.module.scss'
import { IconApp } from '../icons/icon-app'
import { useTranslation } from 'react-i18next'



/// TODO: в событие onChange, проблема с типизацией.

interface SelectCProps {
    placeholder: string
    mobile?: boolean
    options: any[]
    onChange?: (v: any) => void
    value: string | number,
    listHeight?: number;
    typeChange?: (id:any) => void;
}

export const SelectC:FC<SelectCProps> = ({
    placeholder,
    options,
    onChange,
    typeChange,
    value,
    mobile,
    listHeight
}) => {
    const {t} = useTranslation()
    const [active, setActive] = useState(false)

    const optionHandler = (feeLabel:string, id:any) => {
        typeChange ? typeChange(id) : onChange(feeLabel)
        setActive(false)
    }

    const bodyRef = useRef(null)

    const useOutsideAlerter = (ref: MutableRefObject<HTMLElement | null>) => {
        useEffect(() => {
          function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setActive(false)
            }
          }
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [ref]);
      }

    useOutsideAlerter(bodyRef);

    return ( 
        <div ref={bodyRef} className={`${styles.SelectWrap} ${active && styles.active} ${listHeight && styles.ScrollStyle} ${mobile && styles.MobileHeight}`}>
            <div onClick={() => setActive(!active)} className={styles.SelectActive}>
                <span className={styles.SelectTitle}>{value || placeholder}</span>
                <IconApp code='t08' size={10} className={`${!active ? 'rotate-[90deg]' : 'rotate-[-90deg]'}`} color='#var(--color-gray-600)' />
            </div>
           <div className={styles.SelectListWrap} style={{height: listHeight && `${listHeight}px`}}>
            <div className={styles.SelectList}>
                    {
                        options && options.map((item, ind) => (
                            <div key={ind} onClick={() => optionHandler(item.label, item.value)} className={`${styles.SelectOption} ${value === item.label && styles.SelectedOption}`} >
                                {item.label}
                            </div>
                        ))
                    }
                </div>
           </div>
        </div>
    )
}