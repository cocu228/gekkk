import {FC, ReactNode} from 'react'
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import styles from './styles.module.scss'
import { IconApp } from '../icons/icon-app';

interface ModalProps {
    isModalOpen: boolean;
    handleCancel: () => void;
    title: string;
    children: ReactNode
}

export const Modal:FC<ModalProps> = ({
    isModalOpen,
    handleCancel,
    title,
    children
}) => {
    return (
        <Transition appear show={isModalOpen}>
            <Dialog as="div" className="relative z-10 focus:outline-none" onClose={handleCancel}>
                
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
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
                                {title}
                                <IconApp onClick={handleCancel} code='t69' className='cursor-pointer' size={30} color='#bdc3c7' />
                            </div>
                            <div className={styles.ModalBody}>
                                {children}
                            </div>
                        </div>
                    </DialogPanel>
                </TransitionChild>
                </div>
            </div>
            {/* <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 transform-[scale(95%)]"
                enterTo="opacity-100 transform-[scale(100%)]"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 transform-[scale(100%)]"
                leaveTo="opacity-0 transform-[scale(95%)]"
              >
                <DialogPanel className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl">
                  <DialogTitle as="h3" className="text-base/7 font-medium text-white">
                    Payment successful
                  </DialogTitle>
                  <p className="mt-2 text-sm/6 text-white/50">
                    Your payment has been successfully submitted. We’ve sent you an email with all of the details of
                    your order.
                  </p>
                  <div className="mt-4">
                    hi
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div> */}
            </Dialog>
        </Transition>
    )
}