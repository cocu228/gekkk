import { FC, ReactNode, useEffect, useRef } from 'react'
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import styles from './styles.module.scss'
import { IconApp } from '../icons/icon-app';

interface ModalProps {
  title: string;
  zIndex?: boolean;
  closable?: boolean;
  children: ReactNode;
  onCancel: () => void;
  isModalOpen: boolean;
  placeBottom?: boolean;
  destroyOnClose?: boolean;
  noHeaderBorder?: boolean;
}

export const Modal: FC<ModalProps> = ({
  title,
  zIndex,
  children,
  onCancel,
  isModalOpen,
  placeBottom,
  noHeaderBorder,
  closable = true,
  destroyOnClose = true
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleBackButton = (event: Event) => {
      if (isModalOpen && modalRef.current) {
        event.preventDefault();
        onCancel();
      }
    };
  
    window.addEventListener('popstate', handleBackButton);
  
    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, [isModalOpen, onCancel]);

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
      <Dialog
        as="div"
        ref={modalRef}
        onClose={onCancel}
        unmount={destroyOnClose}
        className={`relative ${zIndex ? 'z-[200]' : 'z-[150]'} focus:outline-none`}
      >
        <div className={`${styles.Modal} ${noHeaderBorder && styles.ModalNoBorder}`}>
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