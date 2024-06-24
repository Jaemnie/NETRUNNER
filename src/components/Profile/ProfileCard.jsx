import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import styles from './ProfileCard.module.css';

const ProfileCard = ({ profileData, onClose }) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.profileCard}>
          <div className={styles.profileCardImg}>
            <img src="https://res.cloudinary.com/muhammederdem/image/upload/v1537638518/Ba%C5%9Bl%C4%B1ks%C4%B1z-1.jpg" alt="profile card" />
          </div>

          <div className={styles.profileCardCnt}>
            <div className={styles.profileCardName}>{profileData.userId}</div>
            <div className={styles.profileCardLoc}>
              <span className={styles.profileCardLocIcon}>
                <FaUserCircle />
              </span>
              <span className={styles.profileCardLocTxt}>
                Istanbul, Turkey
              </span>
            </div>

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
