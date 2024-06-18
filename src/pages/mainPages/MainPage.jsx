import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import styles from './MainPage.module.css';
import TermPage from '../../components/termPage';
import ClickEffect from './ClickEffect';
import Quest from '../../components/quest';
import Shop from '../../components/shop';

const MenuContent = {
  terminer: <TermPage />,
  quest: null, // quest를 null로 초기화하고 아래에서 조건부 렌더링
  shop: null  // shop을 null로 초기화하고 아래에서 조건부 렌더링
};

function MainPage() {
  const [clickPositions, setClickPositions] = useState([]);
  const [showAnimation, setShowAnimation] = useState(true);
  const [showSplitScreen, setShowSplitScreen] = useState(false);
  const [missionData, setMissionData] = useState(null); // XML 데이터를 저장할 상태
  const [userId, setUserId] = useState(''); // 사용자 ID 상태

  const handleClick = (event) => {
    const { pageX: x, pageY: y } = event;
    setClickPositions([...clickPositions, { x, y }]);
    setTimeout(() => {
      setClickPositions(currentPositions => currentPositions.slice(1));
    }, 200); // 200ms 후에 이펙트 제거
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
      setShowSplitScreen(true);
      setTimeout(() => {
        setShowSplitScreen(false);
      }, 1000); // 1초 후에 화면 갈라짐 애니메이션 제거
    }, 3000); // 3초 후에 애니메이션 제거

    // 여기서 백엔드 API를 호출하여 데이터를 가져와서 상태에 저장
    const fetchMissionData = async () => {
      try {
        const response = await fetch('http://172.16.230.134:4000/missions');
        const data = await response.json();
        setMissionData(data.mission);
      } catch (error) {
        console.error('Error fetching mission data:', error);
      }
    };

    fetchMissionData();

    // 로그인된 사용자 ID 설정 (예시)
    setUserId('testuser'); // 실제 사용자 ID로 변경

    return () => clearTimeout(timer);
  }, []);

  // 현재 선택된 메뉴 항목을 저장하는 상태
  const [currentMenu, setCurrentMenu] = useState('terminer');

  // 메뉴 항목 클릭 핸들러
  const handleMenuClick = (menuKey) => {
    setCurrentMenu(menuKey);
  };

  return (
    <div>
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
