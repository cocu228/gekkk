import {Modal as ModalAntd, ModalProps} from "antd";
import styles from './styles.module.scss'

const Modal = ({open, onCancel, children, ...props}: ModalProps) => {

    return (
        <ModalAntd open={open} footer={null} onCancel={onCancel} width="454px" className={styles.Modal} {...props}>
            <div className="py-10 px-8 text-gekDarkGray md:px-0 md:pb-0">
                {children}
            </div>
        </ModalAntd>
    )
}

export default Modal
