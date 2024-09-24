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

    // const [close, setClose] = useState(false);
    // console.log("local CLose", close);

    // const handleModalClose = () => {
    //     setClose(true);
    // };

    // const handleConfirm = () => {
    //     onConfirm();
    //     handleModalClose();
    // };

    // const handleAnimationEnd = () => {
    //     if (close) {
    //         onClose();
    //     }
    // };
    // <StyledMask close={close} onAnimationEnd={handleAnimationEnd}>
    //     <StyledModalWrapper close={close}>
    //         <div className="modal-content">
    //             <div className="modal-title">{title}</div>
    //             <div className="modal-body">{children}</div>
    //             <div className="button-group">
    //                 <Button color="gray" onClick={handleModalClose}>
    //                     취소
    //                 </Button>
    //                 <Button color="skyblue" onClick={handleConfirm}>
    //                     확인
    //                 </Button>
    //             </div>
    //         </div>

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
            <div className={`${style.modalContent} ${style.augs}`} ref={modalRef} data-augmented-ui >
                {children}
            </div>
        </div>,
        modalRoot
    );
};

export default Modal;
