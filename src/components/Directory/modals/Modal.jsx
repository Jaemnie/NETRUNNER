import React, { useCallback, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import './modal.css';

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
        <div className="modalOverlay">
            <div className="modalContent" ref={modalRef}>
                {children}
            </div>
        </div>,
        modalRoot
    );
};

export default Modal;
