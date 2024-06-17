import {FC} from 'react'
import styles from "../../style.module.scss";

interface ISelectOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

const SelectOverlay: FC<ISelectOverlayProps> = ({ isOpen, onClose }) => (
    <div className={`${styles.Overlay} ${isOpen ? styles.OverlayOpen : ""}`} onClick={onClose}/>
);

export default SelectOverlay;
