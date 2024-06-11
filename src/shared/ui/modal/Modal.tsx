import {FC, ReactNode} from 'react'
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import styles from './styles.module.scss'
import { IconApp } from '../icons/icon-app';

interface ModalProps {
    isModalOpen: boolean;
    onCancel: () => void;
    title: string;
    children: ReactNode;
    destroyOnClose?: boolean;
    placeBottom?: boolean;
    noBorder?: boolean;
    closable?: boolean;
    zIndex?: boolean;
}

export const Modal:FC<ModalProps> = ({
    isModalOpen,
    onCancel,
    title,
    children,
    destroyOnClose = true,
    placeBottom,
    noBorder,
    zIndex,
    closable = true
}) => {
    return (
        <Transition
            unmount={destroyOnClose}
            enter="linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="linear duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0" 
            appear 
            show={isModalOpen}
        >
            <Dialog as="div" unmount={destroyOnClose} className={`relative ${zIndex ? 'z-[200]' : 'z-[150]'} focus:outline-none`} onClose={onCancel}>
                <div className={`${styles.Modal} ${noBorder && styles.ModalNoBorder}`}>
                    <div className={`${styles.ModalContainer} ${placeBottom && styles.ModalContainerBottom}`}>
                    <TransitionChild
                        unmount={destroyOnClose}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <DialogPanel className={styles.DialogPanel} >
                            <div className={styles.ModalWrap}>
                                <div className={styles.ModalHeader}>
                                    <span className={styles.ModalTitle}>{title}</span>                                      
                                    {
                                        closable && (
                                            <IconApp onClick={onCancel} code='t26' className={styles.ModalClose} size={20} color='#7B797C' />
                                        ) 
                                    }
                                </div>
                                <div className={styles.ModalBody}>
                                    {children}
                                </div>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}