import React, { useState, useEffect } from 'react';
import { FaHome, FaCalendarCheck, FaShoppingCart, FaCog, FaUserCircle, FaTrophy, FaMegaport } from 'react-icons/fa';
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
import PortHackModal from './HackTool/PortHack';  // PortHackModal 컴포넌트 가져오기
import { SocketResult } from '../../socket/socket';
import { fetchMissionData, fetchProfileData } from "../../config";  // API 함수 가져오기

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
  const [showPortHackModal, setShowPortHackModal] = useState(false);  // PortHackModal 표시 상태
  const [ports, setPorts] = useState([]);  // PortHackModal의 포트 데이터 상태

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
      const data = await fetchMissionData(missionID, token);
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
    } else if (menuKey === 'porthack') {
      setShowPortHackModal(true);  // PortHackModal 표시
    } else {
      setCurrentMenu(menuKey);
    }
  };

  const openProfileCard = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('accessToken');
    try {
      const data = await fetchProfileData(userId, token);
      setProfileData(data);
      setShowProfileCard(true);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  const closeProfileCard = () => {
    setShowProfileCard(false);
  };

  const closePortHackModal = () => {
    setShowPortHackModal(false);
  };

  const handleHackPort = (portId) => {
    // Port hack handling logic here (test purpose or backend integration)
    console.log(`Attempting to hack port: ${portId}`);
    // Update port status to open after hacking
    setPorts((prevPorts) =>
      prevPorts.map(port =>
        port.id === portId ? { ...port, status: 'open' } : port
      )
    );
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
            <button
              onClick={(e) => handleMenuClick('porthack', e)}
              className={classNames(styles.menuButton, { [styles.active]: currentMenu === 'porthack' })}
              aria-label="PortHack">
              <FaMegaport style={{ fontSize: '1.75rem' }} />
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
      {showPortHackModal && (
        <PortHackModal
          show={showPortHackModal}
          onClose={closePortHackModal}
          onHack={handleHackPort}
          ports={ports}
          setPorts={setPorts}
        />
      )}
    </div>
  );
}

export default MainPage;
