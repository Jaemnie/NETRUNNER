import React from 'react';
import styles from './esc.module.css';

function Modal({ show, onClose }) {
  if (!show) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Modal Title</h2>
        <p>This is a modal dialog.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Modal;
