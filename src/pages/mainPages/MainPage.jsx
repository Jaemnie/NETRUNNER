import React, { useState, useEffect } from 'react';
import { FaHome, FaCalendarCheck, FaShoppingCart, FaCog, FaUserCircle } from 'react-icons/fa';
import classNames from 'classnames';
import styles from './MainPage.module.css';
import MainPageComp from '../../components/mainPage';
import Quest from '../../components/quest';
import Shop from '../../components/shop';
import BackgroundMusic from '../../components/BackgroundMusic';
import ProfileCard from '../../components/Profile/ProfileCard';
import Setting from '../../pages/mainPages/Setting';
import bgm from '../../assets/mainbgm.mp3';
import { SocketResult } from '../../components/socket'; // SocketResult 클래스를 가져옵니다.

const MenuContent = {
  terminer: <MainPageComp />,
  shop: null
};

function MainPage() {
  const [clickPositions, setClickPositions] = useState([]);
  const [showAnimation, setShowAnimation] = useState(true);
  const [showSplitScreen, setShowSplitScreen] = useState(false);
  const [currentMenu, setCurrentMenu] = useState('terminer');
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [showSetting, setShowSetting] = useState(false);
  const [showQuest, setShowQuest] = useState(false);
  const [questData, setQuestData] = useState(null);
  const [socketResult, setSocketResult] = useState(null);
  const [currentMissionID, setCurrentMissionID] = useState(1); // 현재 미션 ID 상태 추가

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

  const handleClick = (event) => {
    const { pageX: x, pageY: y } = event;
    setClickPositions((prevPositions) => [...prevPositions, { x, y }]);
    setTimeout(() => {
      setClickPositions((currentPositions) => currentPositions.slice(1));
    }, 200);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setShowSetting((prev) => !prev);
    }
  };

  useEffect(() => {
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
    const token = localStorage.getItem('accessToken'); // 올바른 키로 JWT 토큰 가져오기
    console.log('User ID:', userId);
    console.log('Token:', token);
    try {
      const response = await fetch(`http://netrunner.life:4000/missions/${missionID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // JSON으로 요청
          'Authorization': `Bearer ${token}` // JWT를 포함합니다.
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setQuestData(data); // JSON 데이터 처리
      setShowQuest(true);

      if (socketResult) {
        socketResult.joinRoom(userId);
      }
    } catch (error) {
      console.error('Error fetching quest data:', error);
    }
  };

  const handleMenuClick = async (menuKey) => {
    console.log('Menu clicked:', menuKey);
    if (menuKey === 'quest') {
      await fetchMission(currentMissionID); // 현재 미션 ID로 미션 데이터 가져오기
    } else if (menuKey === 'shop') {
      MenuContent.shop = <Shop userId={userId} />;
      setCurrentMenu(menuKey);
    } else {
      setCurrentMenu(menuKey);
    }
  };

  const openProfileCard = async () => {
    try {
      const response = await fetch(`http://netrunner.life:4000/auth/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}` // 올바른 키로 JWT 토큰 가져오기
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
        <main className={styles.main} onClick={handleClick}>
          <nav className={styles.mainMenu}>
            <a href="#" onClick={() => handleMenuClick('terminer')} className={classNames({ [styles.active]: currentMenu === 'terminer' })}>
              <FaHome />
            </a>
            <a href="#" onClick={() => handleMenuClick('quest')} className={classNames({ [styles.active]: currentMenu === 'quest' })}>
              <FaCalendarCheck />
            </a>
            <a href="#" onClick={() => handleMenuClick('shop')} className={classNames({ [styles.active]: currentMenu === 'shop' })}>
              <FaShoppingCart />
            </a>
            <div className={styles.navspacer}></div>
            <a href="#" onClick={() => setShowSetting(true)}>
              <FaCog />
            </a>
            <a href="#" onClick={openProfileCard}>
              <FaUserCircle style={{ fontSize: '1.75rem' }} />
            </a>
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
