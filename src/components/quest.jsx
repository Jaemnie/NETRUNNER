import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FaList, FaEnvelope } from 'react-icons/fa';
import styles from './Quest.module.css';

const Quest = ({ userId, show, onClose, questData }) => {
  const [activeTab, setActiveTab] = useState('list'); // 'list' or 'message'
  const [displayedMessages, setDisplayedMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesLoaded = useRef(false);
  const questContainerRef = useRef(null);

  useEffect(() => {
    if (activeTab === 'message' && !messagesLoaded.current) {
      setDisplayedMessages([]);
      setIsTyping(true);
      const messages = questData.scenario[0].split(' ,');
      messages.forEach((message, index) => {
        setTimeout(() => {
          setDisplayedMessages(prevMessages => [...prevMessages, message.trim()]);
          if (index === messages.length - 1) {
            setIsTyping(false);
            messagesLoaded.current = true; // 메시지가 모두 로드되었음을 표시
          }
        }, (index + 1) * 2000);
      });
    }
  }, [activeTab, questData]);

  useEffect(() => {
    const container = questContainerRef.current;
    let startY;
    let scrollTop;

    const onMouseDown = (e) => {
      startY = e.pageY - container.offsetTop;
      scrollTop = container.scrollTop;
      container.style.cursor = 'grabbing';
    };

    const onMouseMove = (e) => {
      if (startY !== undefined) {
        const y = e.pageY - container.offsetTop;
        const walk = y - startY;
        container.scrollTop = scrollTop - walk;
      }
    };

    const onMouseUp = () => {
      startY = undefined;
      container.style.cursor = 'grab';
    };

    if (container) {
      container.addEventListener('mousedown', onMouseDown);
      container.addEventListener('mousemove', onMouseMove);
      container.addEventListener('mouseup', onMouseUp);
      container.addEventListener('mouseleave', onMouseUp);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousedown', onMouseDown);
        container.removeEventListener('mousemove', onMouseMove);
        container.removeEventListener('mouseup', onMouseUp);
        container.removeEventListener('mouseleave', onMouseUp);
      }
    };
  }, []);

  if (!show) {
    return null;
  }

  const renderMessageList = () => (
    <div className={styles.messageList}>
      <div className={styles.profileHeader}>
        <img src="https://i.imgur.com/FuHIa08.jpeg" alt="Profile" className={styles.profileImage} />
        <h2>010-XXXX-XXXX</h2>
      </div>
      {displayedMessages.map((message, index) => (
        <div key={index} className={styles.message}>
          <p>{message}</p>
        </div>
      ))}
      {isTyping && <TypingIndicator />}
    </div>
  );

  const renderMissionDetails = () => (
    <div className={styles.missionDetails}>
      <h2>미션 상세 정보</h2>
      <p><strong>노드 정보</strong></p>
      <ul>
        <li><strong>IP 주소:</strong> {questData.node[0].nodeIP[0]}</li>
        <li><strong>목표가 가진 프로그램:</strong> {questData.node[0].nodeProgram[0].programName[0]}</li>
      </ul>
      <p><strong>보상</strong></p>
      <ul>
        <li><strong>포인트:</strong> {questData.reward[0].point[0]}</li>
        <li><strong>도구 파일:</strong> {questData.reward[0].toolFile[0]}</li>
      </ul>
    </div>
  );

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === 'message' && !messagesLoaded.current) {
      messagesLoaded.current = false; // 메시지를 다시 로드하지 않도록 설정
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.ipad}>
          <div className={styles.screen}>
            <div className={styles.tabContainer}>
              <div className={styles.tab} onClick={() => handleTabClick('list')}>
                <FaList size={24} />
              </div>
              <div className={styles.tab} onClick={() => handleTabClick('message')}>
                <FaEnvelope size={24} />
              </div>
            </div>
            <div className={styles.questContainer} ref={questContainerRef}>
              {activeTab === 'list' && questData && renderMissionDetails()}
              {activeTab === 'message' && questData && renderMessageList()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TypingIndicator = () => (
  <div className={styles.typingIndicator}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

Quest.propTypes = {
  userId: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  questData: PropTypes.object.isRequired,
};

export default Quest;
