import React, { useCallback, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import style from './modal.module.css';
// import './window.css';

const Modal = ({ isOpen, closeModal, children }) => {
    const modalRef = useRef();
    const modalRoot = document.getElementById('modal-root');

    const handle = useCallback(() => {
        closeModal();
    }, [closeModal]);

    useEffect(() => {
        if (!isOpen) return;
        const handler = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                handle();
            }
        };
        document.addEventListener('mousedown', handler);
        return () => {
            document.removeEventListener('mousedown', handler);
        };
    }, [handle, isOpen]);

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className={style.modalOverlay}>
            <div className={`${style.modalContent} ${style.augsModal}`} ref={modalRef} data-augmented-ui>
                {children}
            </div>
        </div>,
        modalRoot
    );
};

export default Modal;
