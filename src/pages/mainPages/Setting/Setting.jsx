// Setting.js

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAudio } from '../../../components/Background/AudioContext';
import styles from './Setting.module.css';
import { API } from "../../../config";

function Setting({ show, onClose }) {
  const navigate = useNavigate();
  const { isMuted, toggleMute } = useAudio();

  useEffect(() => {
    if (!show) return;

    const slideToggle = document.getElementById("slide-toggle-control");
    if (!slideToggle) return;

    const applyEffect = () => {
      slideToggle.nextElementSibling.classList.toggle(styles.checked, slideToggle.checked);
    };

    slideToggle.addEventListener('change', applyEffect);

    // Initialize effect on mount
    applyEffect();

    // Clean up event listener on unmount
    return () => {
      slideToggle.removeEventListener('change', applyEffect);
    };
  }, [show]);

  if (!show) return null;

  const handleLogout = async () => {
    try {
      const response = await fetch(`${API.LOGOUT}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Logout failed: ${response.statusText}`);
      }

      localStorage.removeItem('accessToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('leaveRoom');
      navigate('/');

      console.log('Logged out successfully.');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.header}>Options</h2>
        <div className={styles.inputContainer}>
          <input
            type="checkbox"
            id="slide-toggle-control"
            checked={isMuted}
            onChange={toggleMute}
          />
          <label htmlFor="slide-toggle-control" className={styles.toggleSwitch}></label>
          <span className={styles.labelText}>BGM</span>
        </div>
        <button className={styles.settingButton} onClick={handleLogout}>Logout</button>
        <button className={styles.settingButton} onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Setting;
