import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import styles from './MainPage.module.css';
import TermPage from '../../components/termPage';
import Quest from '../../components/quest';
import Shop from '../../components/shop';
import BackgroundMusic from '../../components/BackgroundMusic';
import Modal from '../../pages/mainPages/esc'; // Modal 컴포넌트 임포트
import bgm from '../../assets/mainbgm.mp3';

const MenuContent = {
  terminer: <TermPage />,
  quest: null,
  shop: null
};

function MainPage() {
  const [clickPositions, setClickPositions] = useState([]);
  const [showAnimation, setShowAnimation] = useState(true);
  const [showSplitScreen, setShowSplitScreen] = useState(false);
  const [missionData, setMissionData] = useState(null);
  const [userId, setUserId] = useState('');
  const [currentMenu, setCurrentMenu] = useState('terminer');
  const [showModal, setShowModal] = useState(false);

  const handleClick = (event) => {
    const { pageX: x, pageY: y } = event;
    setClickPositions((prevPositions) => [...prevPositions, { x, y }]);
    setTimeout(() => {
      setClickPositions((currentPositions) => currentPositions.slice(1));
    }, 200);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setShowModal(true);
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
        const response = await fetch('http://127.0.0.1:3000/missions');
        const data = await response.json();
        setMissionData(data.mission);
      } catch (error) {
        console.error('Error fetching mission data:', error);
      }
    };

    fetchMissionData();
    setUserId('testuser');

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleMenuClick = (menuKey) => {
    setCurrentMenu(menuKey);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.mainContainer}>
      <BackgroundMusic src={bgm} /> {/* BackgroundMusic 컴포넌트 추가 */}
      <Modal show={showModal} onClose={closeModal} /> {/* Modal 컴포넌트 추가 */}
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
            <h1>NetRunner</h1>
            <ul>
              <li className={classNames(styles.navItem, { [styles.active]: currentMenu === 'terminer' })}>
                <b></b>
                <b></b>
                <a href="#" onClick={() => handleMenuClick('terminer')}>
                  <i className={`fa fa-house ${styles.navIcon}`}></i>
                  <span className={styles.navText}>터미널</span>
                </a>
              </li>
              <li className={classNames(styles.navItem, { [styles.active]: currentMenu === 'quest' })}>
                <b></b>
                <b></b>
                <a href="#" onClick={() => handleMenuClick('quest')}>
                  <i className={`fa fa-calendar-check ${styles.navIcon}`}></i>
                  <span className={styles.navText}>퀘스트</span>
                </a>
              </li>
              <li className={classNames(styles.navItem, { [styles.active]: currentMenu === 'shop' })}>
                <b></b>
                <b></b>
                <a href="#" onClick={() => handleMenuClick('shop')}>
                  <i className={`fa fa-person-running ${styles.navIcon}`}></i>
                  <span className={styles.navText}>상점</span>
                </a>
              </li>
            </ul>
          </nav>
          <section className={styles.content}>
            {currentMenu === 'quest' && missionData ? <Quest missionData={missionData} /> : null}
            {currentMenu === 'shop' && userId ? <Shop userId={userId} /> : null}
            {currentMenu !== 'quest' && currentMenu !== 'shop' ? MenuContent[currentMenu] : null}
          </section>
        </main>
      )}
    </div>
  );
}

export default MainPage;
