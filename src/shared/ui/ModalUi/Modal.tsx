import {FC, ReactNode} from 'react'
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import styles from './styles.module.scss'
import { IconApp } from '../icons/icon-app';

interface ModalProps {
    isModalOpen: boolean;
    handleCancel: () => void;
    title: string;
    children: ReactNode
    footer?: ReactNode
}

export const Modal:FC<ModalProps> = ({
    isModalOpen,
    handleCancel,
    title,
    children,
    footer
}) => {
    return (
        <Transition 
            enter="linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="linear duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0" 
            appear 
            show={isModalOpen}
        >
            <Dialog as="div" className="relative z-[150] focus:outline-none" onClose={handleCancel}>
                <div className={styles.ModalOverlay}>
                    <div className={styles.ModalContainer}>
                    <TransitionChild
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 transform-[scale(95%)]"
                        enterTo="opacity-100 transform-[scale(100%)]"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 transform-[scale(100%)]"
                        leaveTo="opacity-0 transform-[scale(95%)]"
                    >
                        <DialogPanel className={styles.DialogPanel} >
                            <div className={styles.ModalWrap}>
                                <div className={styles.ModalHeader}>
                                    <span className={styles.ModalTitle}>{title}</span>
                                    <IconApp onClick={handleCancel} code='t26' className='cursor-pointer' size={20} color='#7B797C' />
                                </div>
                                <div className={styles.ModalBody}>
                                    {children}
                                </div>
                                {
                                    footer && (
                                        <div className={styles.ModalFooter}>
                                            {footer}
                                        </div>
                                    )
                                }
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}