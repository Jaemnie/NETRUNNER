import React, { useEffect } from 'react';
import { SVG } from '@svgdotjs/svg.js';
import { useNavigate } from 'react-router-dom'; // useNavigate로 수정
import { useAudio } from '../../../components/Background/AudioContext'; // 컨텍스트 가져오기
import styles from './Setting.module.css';
import { API } from "../../../config";

function Setting({ show, onClose }) {
  const navigate = useNavigate();
  const { isMuted, toggleMute } = useAudio(); // 음소거 상태와 토글 함수 가져오기

  useEffect(() => {
    if (!show) return;

    const slideToggle = document.getElementById("slide-toggle-control");

    if (!slideToggle) return;

    const slide = {
      element: slideToggle,
      handler: svgSlideEffect,
      offset: 10,
      duration: 200,
      random: false,
    };

    const slideEffect = new SvgToggleEffect(slide);

    return () => {
      slideEffect.cleanup();
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

      // 로그아웃 성공 시 로컬 저장소에서 JWT 토큰 제거
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userId'); // userId 삭제
      localStorage.removeItem('leaveRoom');
      navigate('/'); // 초기 화면으로 이동

      console.log('로그아웃 되었습니다.');
    } catch (error) {
      console.error('로그아웃 에러:', error);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.header}>Setting</h2>
        <div className={styles.inputContainer}>
          <input
            type="checkbox"
            id="slide-toggle-control"
            checked={isMuted}
            onChange={toggleMute} // 체크박스 상태 변경 시 음소거 토글
          />
          <label htmlFor="slide-toggle-control" className={styles.controlLabel}>
            <svg width="84" height="36">
              <rect x="0" y="0" width="84" height="36" />
            </svg>
            <span className={styles.labelText}>BGM</span> {/* BGM 텍스트 추가 */}
          </label>
        </div>
        <button className={styles.settingButton} onClick={handleLogout}>Logout</button>
        <button className={styles.settingButton} onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

class SvgToggleEffect {
  constructor(effect) {
    this.node = SVG(effect.element.nextElementSibling.querySelector('svg'));

    this.listener = () => {
      if (effect.element.checked) {
        effect.handler([this.node], false, effect.duration, effect.offset);
      } else {
        effect.handler([this.node], true, effect.duration, effect.offset);
      }
    };

    effect.element.addEventListener("change", this.listener);
  }

  cleanup() {
    this.node.node.removeEventListener("change", this.listener);
  }
}

const svgSlideEffect = (nodes = [], reverse = false, duration = 100, offset = 10) => {
  nodes.forEach((node, index) => {
    setTimeout(() => {
      if (reverse) {
        node.animate({ duration: duration }).transform({ x: 0 });
      } else {
        node.animate({ duration: duration }).transform({ x: 48 });
      }
    }, index * offset);
  });
};

export default Setting;
