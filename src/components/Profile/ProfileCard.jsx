import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import styles from './ProfileCard.module.css';

// ProfileCard 컴포넌트 정의
const ProfileCard = ({ profileData, onClose }) => {
  return (
    // 모달 오버레이 클릭 시 onClose 함수 호출
    <div className={styles.modalOverlay} onClick={onClose}>
      {/* 모달 콘텐츠 클릭 시 이벤트 전파 중단 */}
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.profileCard}>
          {/* 프로필 이미지 */}
          <div className={styles.profileCardImg}>
            <img src="https://i.imgur.com/FuHIa08.jpeg" alt="profile card" />
          </div>

          <div className={styles.profileCardCnt}>
            {/* 사용자 이름 */}
            <div className={styles.profileCardName}>{profileData.userId}</div>
            {/* 위치 정보 */}
            <div className={styles.profileCardLoc}>
              <span className={styles.profileCardLocIcon}>
                <FaUserCircle />
              </span>
              <span className={styles.profileCardLocTxt}>
                 위치 파악 불가
              </span>
            </div>

            {/* 프로필 정보 (레벨, 포인트) */}
            <div className={styles.profileCardInf}>
              <div className={styles.profileCardInfItem}>
                <div className={styles.profileCardInfTitle}>{profileData.level}</div>
                <div className={styles.profileCardInfTxt}>Level</div>
              </div>
              <div className={styles.profileCardInfItem}>
                <div className={styles.profileCardInfTitle}>{profileData.point}</div>
                <div className={styles.profileCardInfTxt}>Points</div>
              </div>
            </div>

            {/* 닫기 버튼 */}
            <div className={styles.profileCardCtr}>
              <button className={`${styles.profileCardButton} ${styles.buttonBlue}`} onClick={onClose}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
