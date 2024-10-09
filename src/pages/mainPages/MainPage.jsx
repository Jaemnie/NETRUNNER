import React, { useState, useEffect } from 'react';
import { FaHome, FaCalendarCheck, FaShoppingCart, FaCog, FaUserCircle, FaTrophy, FaMegaport, FaTheaterMasks, FaKeycdn, FaBacon, FaMix, FaMoneyCheck } from 'react-icons/fa';
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
import PortHackModal from './HackTool/PortHack';
import DecypherModal from './HackTool/Decypher';
import DECHeadModal from './HackTool/DECHead';
import SSHcrackModal from './HackTool/SSHcrack';
import { SocketResult } from '../../socket/socket';
import { fetchMissionData, fetchProfileData, API } from "../../config";

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
  const [showPortHackModal, setShowPortHackModal] = useState(false);
  const [showDecypherModal, setShowDecypherModal] = useState(false);
  const [showDECHeadModal, setShowDECHeadModal] = useState(false);
  const [showSSHcrackModal, setShowSSHcrackModal] = useState(false);
  const [ports, setPorts] = useState([]);

  const [hasPurchasedPortHack, setHasPurchasedPortHack] = useState(false);
  const [hasPurchasedSSHcrack, setHasPurchasedSSHcrack] = useState(false);
  const [hasPurchasedSMTPoverflow, setHasPurchasedSMTPoverflow] = useState(false);
  const [hasPurchasedWebServerWorm, setHasPurchasedWebServerWorm] = useState(false);
  const [hasPurchasedDecypher, setHasPurchasedDecypher] = useState(false);
  const [hasPurchasedDECHead, setHasPurchasedDECHead] = useState(false);
  const [toolList, setToolList] = useState([]);

  const [menuContent, setMenuContent] = useState({
    terminer: <MainPageComp />,
    shop: null,
    lanking: <Lanking />
  });

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

  // PortHack 도구 구매 여부 확인
  useEffect(() => {
    const checkPortHackPurchase = async () => {
      const token = localStorage.getItem('accessToken');
      try {
        const response = await fetch(`${API.TOOLS}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setToolList(data);
      } catch (error) {
        console.error('Error checking porthack purchase:', error);
      }
    };
    const drawIcon = () => {
      if (Array.isArray(toolList)) {
        toolList.forEach((value, key) => {
          if (value.isBuy) {
            switch (value.name) {
              case 'porthack':
                setHasPurchasedPortHack(true);
                break;
              case 'SSHcrack':
                setHasPurchasedSSHcrack(true);
                break;
              case 'SMTPoverflow':
                setHasPurchasedSMTPoverflow(true);
                break;
              case 'WebServerWorm':
                setHasPurchasedWebServerWorm(true);
                break;
              case 'Decypher':
                setHasPurchasedDecypher(true);
                break;
              case 'DECHead':
                setHasPurchasedDECHead(true);
                break;
              default:
                break;
            }
          }
        });
      } else {
        console.log('toolList는 배열이 아닙니다:', toolList);
      }

    }
    checkPortHackPurchase();
    drawIcon();

  }, [toolList]);

  const fetchMission = async (missionID) => {
    const token = localStorage.getItem('accessToken');
    console.log('Fetching mission with ID:', missionID);

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
      setMenuContent(prevContent => ({
        ...prevContent,
        shop: (
          <Shop
            userId={userId}
            setToolList={() => setToolList()}
          />
        )
      }));
      setCurrentMenu(menuKey);
    } else if (menuKey === 'porthack') {
      setShowPortHackModal(true);
    } else if (menuKey === 'Decypher') {
      setShowDecypherModal(true);
    } else if (menuKey === 'DECHead') {
      setShowDECHeadModal(true);
    } else if (menuKey === 'SSHcrack') {
      setShowSSHcrackModal(true);
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

  const closeDecyoherModal = () => {
    setShowDecypherModal(false);
  }
  const closeDECHeadModal = () => {
    setShowDECHeadModal(false);
  }
  const closeSSHcrackModal = () => {
    setShowSSHcrackModal(false);
  }

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
        <main className={styles.main} >
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
            {hasPurchasedPortHack && (
              <button
                onClick={(e) => handleMenuClick('porthack', e)}
                className={classNames(styles.menuButton, styles.porthack, { [styles.active]: currentMenu === 'porthack' })}
                aria-label="PortHack">
                <FaMegaport style={{ fontSize: '1.75rem' }} />
              </button>
            )}
            {hasPurchasedSSHcrack && (
              <button
                onClick={(e) => handleMenuClick('SSHcrack', e)}
                className={classNames(styles.menuButton, styles.porthack, { [styles.active]: currentMenu === 'SSHcrack' })}
                aria-label="SSHcrack">
                <FaTheaterMasks style={{ fontSize: '1.75rem' }} />
              </button>
            )}
            {hasPurchasedSMTPoverflow && (
              <button
                onClick={(e) => handleMenuClick('SMTPoverflow', e)}
                className={classNames(styles.menuButton, styles.porthack, { [styles.active]: currentMenu === 'SMTPoverflow' })}
                aria-label="SMTPoverflow">
                <FaMix style={{ fontSize: '1.75rem' }} />
              </button>
            )}
            {hasPurchasedWebServerWorm && (
              <button
                onClick={(e) => handleMenuClick('WebServerWorm', e)}
                className={classNames(styles.menuButton, styles.porthack, { [styles.active]: currentMenu === 'WebServerWorm' })}
                aria-label="WebServerWorm">
                <FaBacon style={{ fontSize: '1.75rem' }} />
              </button>
            )}
            {hasPurchasedDecypher && (
              <button
                onClick={(e) => handleMenuClick('Decypher', e)}
                className={classNames(styles.menuButton, styles.porthack, { [styles.active]: currentMenu === 'Decypher' })}
                aria-label="Decypher">
                <FaKeycdn style={{ fontSize: '1.75rem' }} />
              </button>
            )}
            {hasPurchasedDECHead && (
              <button
                onClick={(e) => handleMenuClick('DECHead', e)}
                className={classNames(styles.menuButton, styles.porthack, { [styles.active]: currentMenu === 'DECHead' })}
                aria-label="DECHead">
                <FaMoneyCheck style={{ fontSize: '1.75rem' }} />
              </button>
            )}
            <div className={styles.navspacer}></div>
            <button
              onClick={(e) => { e.preventDefault(); setShowSetting(true); }}
              className={classNames(styles.menuButton, { [styles.active]: currentMenu === 'setting' })}
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
            {menuContent[currentMenu]}
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
          ports={ports}
          setPorts={setPorts}
        />
      )}
      {showDecypherModal && (
        <DecypherModal
          show={showDecypherModal}
          onClose={closeDecyoherModal}
        />
      )}
      {showDECHeadModal && (
        <DECHeadModal
          show={showDECHeadModal}
          onClose={closeDECHeadModal} />
      )}
      {showSSHcrackModal && (
        <SSHcrackModal
          show={showSSHcrackModal}
          onClose={closeSSHcrackModal}
          ports={ports}
          setPorts={setPorts} />
      )}
    </div>
  );
}

export default MainPage;
