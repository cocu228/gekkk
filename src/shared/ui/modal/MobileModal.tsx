import {Modal as ModalAntd, ModalProps} from "antd";
import styles from './styles.module.scss'
import { IconApp } from "../icons/icon-app";

type TModal = ModalProps & { padding?: boolean }
const MobileModal = ({
                   open,
                   onCancel,
                   destroyOnClose = true,
                   children,
                   className,
                   padding = false,
                   width = "454px",
                   ...props
               }: TModal) => {

    return (
        <ModalAntd open={open} destroyOnClose={destroyOnClose} footer={null} onCancel={onCancel} width={width}
            className={`flex items-center justify-center ${className}`} {...props}
            closeIcon={<IconApp className={styles.close} code="t26" size={20} color="#7B797C"/>}>
            <div className={`${padding ? "py-10 px-8" : ""} text-gray-800 md:px-0 md:pb-0 ${styles.underline}`}>
                {children}
            </div>
        </ModalAntd>
    )
}

export default MobileModal
