import {FC, MutableRefObject, ReactNode, useEffect, useRef, useState} from 'react'
import style from './styles.module.scss'
import { useLocation } from 'react-router-dom'

interface DropdownProps {
    className?: string,
    position?: string,
    isOpen?: boolean,
    onOpen?: (value: boolean) => void | undefined,
    trigger: React.ReactNode,
    children: ReactNode,
    desktop?: boolean,
    customBodyClassName?: string,
}

export const Dropdown:FC<DropdownProps> = ({trigger, children, isOpen, position, customBodyClassName, desktop}) => {
    const [opened, setOpened] = useState(false)
    const bodyRef = useRef(null)
    const location = useLocation()

    const useOutsideAlerter = (ref: MutableRefObject<HTMLElement | null>) => {
        useEffect(() => {
          function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpened(false)
            }
          }
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [ref]);
      }

    useOutsideAlerter(bodyRef);
    
    console.log(location)

    return (
        <div ref={bodyRef} className={`${style.DropdownWrap} ${location.pathname === '/private-room' && desktop && style.DropdownActive} ${desktop && style.DropdownWrapDesktop}`}>
             <div className={style.DropdownTriggerWrap}  >
                <div className={`${style.DropdownTrigger} ${opened && style.DropdownTriggerOpened}`} onClick={() => setOpened(!opened)} >
                    {trigger}
                </div>
                <div onClick={() => setOpened(false)} className={`${style.DropdownBody} ${customBodyClassName} ${position === 'right' && style.DropdownBodyRight} ${opened && style.DropdownBodyActive}`}>
                    {children}
                </div>
            </div>
        </div>
    )
}