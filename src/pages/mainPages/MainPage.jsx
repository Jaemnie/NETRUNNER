import React, { useState, useEffect } from 'react';
import { FaHome, FaCalendarCheck, FaShoppingCart, FaCog, FaUserCircle } from 'react-icons/fa';
import classNames from 'classnames';
import styles from './MainPage.module.css';
import MainPageComp from '../../components/mainPage';
import Quest from '../../components/quest';
import Shop from '../../components/shop';
import BackgroundMusic from '../../components/BackgroundMusic';
import ProfileCard from '../../components/Profile/ProfileCard'; // ProfileCard 컴포넌트 임포트
import bgm from '../../assets/mainbgm.mp3';

const MenuContent = {
  terminer: <MainPageComp />,
  quest: null,
  shop: null
};

function MainPage() {
  const [clickPositions, setClickPositions] = useState([]);
  const [showAnimation, setShowAnimation] = useState(true);
  const [showSplitScreen, setShowSplitScreen] = useState(false);
  const [missionData, setMissionData] = useState(null);
  const [currentMenu, setCurrentMenu] = useState('terminer');
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [profileData, setProfileData] = useState(null);

  const userId = localStorage.getItem('userId'); // localStorage에서 userId 가져오기

  const handleClick = (event) => {
    const { pageX: x, pageY: y } = event;
    setClickPositions((prevPositions) => [...prevPositions, { x, y }]);
    setTimeout(() => {
      setClickPositions((currentPositions) => currentPositions.slice(1));
    }, 200);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setShowProfileCard(false);
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

    const fetchMissionData = async () => {
      try {
        const response = await fetch('http://netrunner.life:4000/missions');
        const data = await response.json();
        setMissionData(data.mission);
      } catch (error) {
        console.error('Error fetching mission data:', error);
      }
    };

    fetchMissionData();

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleMenuClick = (menuKey) => {
    setCurrentMenu(menuKey);
  };

  const openProfileCard = async () => {
    try {
      const response = await fetch(`http://netrunner.life:4000/auth/${userId}`, {
        method: 'GET', // GET으로 변경
        headers: {
          'Content-Type': 'application/json',
        },
      });
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
      <BackgroundMusic src={bgm} /> {/* BackgroundMusic 컴포넌트 추가 */}
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
            <a href="#">
              <FaCog />
            </a>
            <a href="#" onClick={openProfileCard}>
              <FaUserCircle style={{ fontSize: '1.75rem' }} />
            </a>
          </nav>
          <section className={styles.content}>
            {currentMenu === 'quest' && missionData ? <Quest missionData={missionData} /> : null}
            {currentMenu === 'shop' && userId ? <Shop userId={userId} /> : null}
            {currentMenu !== 'quest' && currentMenu !== 'shop' ? MenuContent[currentMenu] : null}
          </section>
        </main>
      )}
      {showProfileCard && profileData && <ProfileCard profileData={profileData} onClose={closeProfileCard} />}
    </div>
  );
}

export default MainPage;
