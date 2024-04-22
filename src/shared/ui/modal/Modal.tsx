import {Modal as ModalAntd, ModalProps} from "antd";
import styles from './styles.module.scss'

type TModal = ModalProps & { padding?: boolean }
const Modal = ({
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
                   className={`${styles.Modal} ${className}`} {...props}>
            <div className={`${padding ? "py-10 px-8" : ""} text-gray-800 md:px-0 md:pb-0`}>
                {children}
            </div>
        </ModalAntd>
    )
}

export default Modal
