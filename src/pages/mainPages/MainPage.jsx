import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import styles from './MainPage.module.css';
import TermPage from '../../components/termPage';
import ClickEffect from './ClickEffect';
import Quest from '../../components/quest';
import Shop from '../../components/shop';

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

  const handleClick = (event) => {
    const { pageX: x, pageY: y } = event;
    setClickPositions((prevPositions) => [...prevPositions, { x, y }]);
    setTimeout(() => {
      setClickPositions((currentPositions) => currentPositions.slice(1));
    }, 200);
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

    return () => clearTimeout(timer);
  }, []);

  const handleMenuClick = (menuKey) => {
    setCurrentMenu(menuKey);
  };

  return (
    <div className={styles.mainContainer}>
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
          {clickPositions.map((pos, index) => (
            <ClickEffect key={index} x={pos.x} y={pos.y} />
          ))}
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
