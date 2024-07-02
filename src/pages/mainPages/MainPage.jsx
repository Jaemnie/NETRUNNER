import React, { useState, useEffect } from 'react';
import { FaHome, FaCalendarCheck, FaShoppingCart, FaCog, FaUserCircle, FaTrophy } from 'react-icons/fa';
import classNames from 'classnames';
import styles from './MainPage.module.css';
import MainPageComp from '../../components/MainPageComp/MainPageComp';
import Quest from '../../components/Quest/Quest';
import Shop from '../../components/Shop/shop';
import BackgroundMusic from '../../components/Background/BackgroundMusic';
import ProfileCard from '../../components/Profile/ProfileCard';
import Setting from './Setting/Setting';
import Lanking from '../../components/Lank/Lanking';
import bgm from '../../assets/mainbgm.mp3';
import { SocketResult } from '../../socket/socket';
import { API } from "../../config";

const MenuContent = {
  terminer: <MainPageComp />,
  shop: null,
  lanking: <Lanking />
};

function MainPage() {
  const [showAnimation, setShowAnimation] = useState(true);
  const [showSplitScreen, setShowSplitScreen] = useState(false);
  const [currentMenu, setCurrentMenu] = useState('terminer');
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [showSetting, setShowSetting] = useState(false);
  const [showQuest, setShowQuest] = useState(false);
  const [questData, setQuestData] = useState(null);
  const [socketResult, setSocketResult] = useState(null);
  const currentMissionID = localStorage.getItem('missionId');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const socket = new SocketResult();
    setSocketResult(socket);

    return () => {
      if (socket) {
        socket.leaveRoom();
      }
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setShowSetting((prev) => !prev);
      }
    };

    const timer = setTimeout(() => {
      setShowAnimation(false);
      setShowSplitScreen(true);
      setTimeout(() => {
        setShowSplitScreen(false);
      }, 1000);
    }, 3000);

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const fetchMission = async (missionID) => {
    const token = localStorage.getItem('accessToken');
    console.log('Fetching mission with ID:', missionID); // 현재 미션 아이디 로그 추가
  
    try {
      const response = await fetch(`${API.MISSION}${missionID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetched mission data:', data); // 응답 데이터 로그 추가
      setQuestData(data);
      setShowQuest(true);
  
      if (socketResult) {
        socketResult.joinRoom(userId);
      }
    } catch (error) {
      console.error('Error fetching quest data:', error);
    }
  };  

  const handleMenuClick = async (menuKey, event) => {
    event.preventDefault();
    if (menuKey === 'quest') {
      await fetchMission(currentMissionID);
    } else if (menuKey === 'shop') {
      MenuContent.shop = <Shop userId={userId} />;
      setCurrentMenu(menuKey);
    } else {
      setCurrentMenu(menuKey);
    }
  };

  const openProfileCard = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${API.PROFILECARD}${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProfileData(data);
      setShowProfileCard(true);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  const closeProfileCard = () => {
    setShowProfileCard(false);
  };

  return (
    <div className={styles.mainContainer}>
      <BackgroundMusic src={bgm} />
      {showAnimation && (
        <div className={styles.ringContainer}>
          <div className={styles.ring}>
            <div className={styles.innerRing}></div>
            <span className={styles.span}></span>
          </div>
        </div>
      )}
      {showSplitScreen && (
        <>
          <div className={styles.splitScreenLeft}></div>
          <div className={styles.splitScreenRight}></div>
        </>
      )}
      {!showAnimation && !showSplitScreen && (
        <main className={styles.main}>
          <nav className={styles.mainMenu}>
            <button
              onClick={(e) => handleMenuClick('terminer', e)}
              className={classNames(styles.menuButton, { [styles.active]: currentMenu === 'terminer' })}
              aria-label="Home">
              <FaHome />
            </button>
            <button
              onClick={(e) => handleMenuClick('quest', e)}
              className={classNames(styles.menuButton, { [styles.active]: currentMenu === 'quest' })}
              aria-label="Quest">
              <FaCalendarCheck />
            </button>
            <button
              onClick={(e) => handleMenuClick('shop', e)}
              className={classNames(styles.menuButton, { [styles.active]: currentMenu === 'shop' })}
              aria-label="Shop">
              <FaShoppingCart />
            </button>
            <button
              onClick={(e) => handleMenuClick('lanking', e)}
              className={classNames(styles.menuButton, { [styles.active]: currentMenu === 'lanking' })}
              aria-label="Ranking">
              <FaTrophy />
            </button>
            <div className={styles.navspacer}></div>
            <button
              onClick={(e) => { e.preventDefault(); setShowSetting(true); }}
              className={styles.menuButton}
              aria-label="Settings">
              <FaCog />
            </button>
            <button
              onClick={openProfileCard}
              className={styles.menuButton}
              aria-label="Profile">
              <FaUserCircle style={{ fontSize: '1.75rem' }} />
            </button>
          </nav>
          <section className={styles.content}>
            {MenuContent[currentMenu]}
          </section>
        </main>
      )}
      {showProfileCard && profileData && <ProfileCard profileData={profileData} onClose={closeProfileCard} />}
      {showSetting && <Setting show={showSetting} onClose={() => setShowSetting(false)} />}
      {showQuest && questData && <Quest show={showQuest} onClose={() => setShowQuest(false)} userId={userId} questData={questData} fetchMission={fetchMission} />}
    </div>
  );
}

export default MainPage;
