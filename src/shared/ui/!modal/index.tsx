import { FC, MutableRefObject, ReactNode, useEffect, useRef } from 'react'
import style from './styles.module.scss'
import { IconApp } from '../icons/icon-app';

interface ModalCProps {
    title: ReactNode,
    onClose: () => void;
    children: ReactNode;
    active: boolean
    padding?: boolean
    fullWidth?: boolean
    sidesPadding?: boolean
    width?: number
}

export const ModalC:FC<ModalCProps> = ({title, children, active, onClose, fullWidth, padding, sidesPadding, width}) => {

    const closeHandler = () => {
        onClose()
    }

    const modalRef = useRef<any>();

    const handleOutsideClick = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            closeHandler();
        }
    };

    return (
        <div onClick={handleOutsideClick} className={`${style.ModalWrap} ${active && style.ActiveModal} ${fullWidth && style.FullWidth} `}>
            <div className={style.ModalBody} ref={modalRef} style={{width: width && `${width}px`}} >
                <div className={style.ModalContent} style={{padding: sidesPadding && '40px'}} >
                    <div className={style.ModalHeader}>
                        {title}
                        <IconApp onClick={closeHandler} className='cursor-pointer' code='t26' size={20} color='var(--gek-dark-grey)' />
                    </div>
                    <div style={{padding: padding && '0 0 0 20px'}} >
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}