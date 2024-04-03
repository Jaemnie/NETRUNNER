// Modal.js
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import './modal.css';

const Modal = ({ isOpen, closeModal, children }) => {

    const modalRoot = document.getElementById('modal-root');
    if (!modalRoot)return null;
    if (!isOpen) return null;


    console.log(children);
    return ReactDOM.createPortal(
        <div className="modalOverlay">
            <div className="modalContent">
            <span onClick={closeModal}>&times;</span>
                {children}
            </div>
        </div>,
        modalRoot
    );
};

export default Modal;
