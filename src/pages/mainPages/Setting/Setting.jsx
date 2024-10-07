// Setting.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAudio } from '../../../components/Background/AudioContext';
import styles from './Setting.module.css';
import tutorialStyles from '../../../components/MainPageComp/modals/modal.module.css';
import { API } from "../../../config";
import Modal from '../../../components/MainPageComp/modals/Modal';
import Tutorial from '../../../components/Tutorial/tutorialPage';
import '../../../components/Tutorial/tutorialPage';
function Setting({ show, onClose }) {
  const navigate = useNavigate();
  const { isMuted, toggleMute } = useAudio();

  const [tuto, setTuto] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    localStorage.setItem('tutorial', 'false');
    onClose();
    setIsModalOpen(false);
  };

  // 설정 창이 열릴 때 효과를 적용하는 함수
  const applyEffect = () => {
    const slideToggle = document.getElementById("slide-toggle-control");
    if (slideToggle) {
      slideToggle.nextElementSibling.classList.toggle(styles.checked, slideToggle.checked);
    }
  };

  // 설정 창이 열릴 때 이벤트 리스너를 추가하고 닫힐 때 제거
  useEffect(() => {
    if (!show) return;

    const slideToggle = document.getElementById("slide-toggle-control");
    if (!slideToggle) return;

    slideToggle.addEventListener('change', applyEffect);

    // 마운트 시 효과 초기화
    applyEffect();

    // 언마운트 시 이벤트 리스너 제거
    return () => {
      slideToggle.removeEventListener('change', applyEffect);
    };
  }, [show]);

  // 설정 창이 보이지 않을 때는 null 반환
  if (!show) return null;

  // 로그아웃 핸들러 함수
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
      localStorage.removeItem('questMessages');
      localStorage.removeItem('questMessageSize');
      localStorage.removeItem('countingSave');
      localStorage.removeItem("tutorial");
      localStorage.removeItem("ipData");
      localStorage.removeItem('files');
      document.addEventListener("MoustEvent",
        toggleFullScreen()
      );
      navigate('/');

    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  function toggleFullScreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    // else {
    //   if (document.exitFullscreen) {
    //     document.exitFullscreen();
    //   }
    // }
  }

  const handleTutorial = () => {
    localStorage.setItem('tutorial', 'true');
    setTuto(true);
    // onClose();
    setIsModalOpen(true);
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      {
        tuto && isModalOpen &&
        < Modal isOpen={isModalOpen} closeModal={closeModal}>
          <button className={`${tutorialStyles.close}`} onClick={closeModal}></button>
          <Tutorial />
        </Modal>
      }
      {!tuto &&
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
          <button className={styles.settingButton} onClick={handleTutorial}>Tutorial</button>
        </div>
      }
    </div>
  );
}

export default Setting;
