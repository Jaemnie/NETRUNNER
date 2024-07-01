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

    const initEffect = () => {
      if (slideToggle.checked) {
        slideToggle.nextElementSibling.classList.add(styles.checked);
      } else {
        slideToggle.nextElementSibling.classList.remove(styles.checked);
      }
    };

    const applyEffect = () => {
      if (slideToggle.checked) {
        slideToggle.nextElementSibling.classList.add(styles.checked);
      } else {
        slideToggle.nextElementSibling.classList.remove(styles.checked);
      }
    };

    slideToggle.addEventListener('change', applyEffect);

    initEffect();

    return () => {
      slideToggle.removeEventListener('change', applyEffect);
    };
  }, [show]);

  if (!show) {
    return null;
  }

  const handleLogout = async () => {
    try {
      const response = await fetch(`${API.LOGOUT}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (!response.ok) {
        throw new Error(`로그아웃 실패: ${response.statusText}`);
      }

      localStorage.removeItem('accessToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('leaveRoom');
      navigate('/');

      console.log('로그아웃 되었습니다.');
    } catch (error) {
      console.error('로그아웃 에러:', error);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.header}>옵션</h2>
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
