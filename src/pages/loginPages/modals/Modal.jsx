// Modal.js
import React, { useCallback, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import './modal.css';

const Modal = ({ isOpen, closeModal, children }) => {
    const modalref = useRef();
    const modalRoot = document.getElementById('modal-root');
    

    const handle = useCallback(()=>{
        closeModal();
    },[closeModal]);
    
    useEffect(()=>{
        if(!isOpen) return;
        const handler = (event) =>{
            if(modalref.current && !modalref.current.contains(event.target)){
                handle();
            }
        };
        document.addEventListener('mousedown',handler);
        return() =>{
            document.removeEventListener('mousedown',handler);
        };
    },[handle,isOpen]);
    
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="modalOverlay" >
            <div className="modalContent"ref={modalref}  >
                {children}
            </div>
        </div>,
        modalRoot
    );
};

export default Modal;
